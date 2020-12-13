import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CanActivate, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class UsersService implements CanActivate, OnInit {
  json;
  loginUrl = 'http://localhost:8000/login/'
  regUrl = 'http://localhost:8000/register/'
  recipeUrl = 'http://localhost:8000/recipe/'
  ingredientUrl = 'http://localhost:8000/recipe/ingredients/'
  tagUrl = 'http://localhost:8000/recipe/tags/'
  createRecipeUrl = 'http://localhost:8000/recipe/create/'
  getRecipeUrl = 'http://localhost:8000/recipe/list/'
  deleteUrl = 'http://localhost:8000/recipe/burger2/delete/'
  savedToken = ""
  //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzODQ1Nzg0LCJqdGkiOiJkNTBiNTJiZmExMWU0NjQwOWZiYTA3NzlmMTc4ZWI4ZiIsInVzZXJfaWQiOjN9.A5t3gEKWWIkdEgE3SktvOAkpV9QUMCCneJyuPchd0qM"
  //avedToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzNzQ0ODM5LCJqdGkiOiI0ZTZhYTkwOWI1ZjI0NjFlOTgzZjUyMWQ4ZGViZjU5ZCIsInVzZXJfaWQiOjJ9.Ji3n1Hoy2GzmtG7KhxqLeY5rsCOysVKqlpfWYK2ERec"

  guestToken = '';

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.guestToken = this.cookieService.get('guestToken');
    this.savedToken = this.cookieService.get('userToken');
    this.ngOnInit();
  }

  async ngOnInit() {
    const guest = {
      username: "guest",
      email: "guest@nowhere.com",
      password: "guestguest"
    };
    await this.loginGuest(guest);
    if (this.guestToken == '') {
      this.registerUser(guest);
      this.loginGuest(guest);
    }
  }

  async loginGuest(guest) {
    const resp = await this.loginUser(guest, false);
    if (resp['tokens'] == "") {
      return;
    }
    if (resp['status'] == 400) {
      return;
    }
    const jsonStr = resp['tokens'].split("'").join("\"")
    console.log(jsonStr)
    var obj = JSON.parse(jsonStr);
    this.guestToken = obj.access
    this.cookieService.set('guestToken', obj.access);
    console.log('------------')
    console.log(this.guestToken)
  }

  canActivate(): boolean {
    if (this.cookieService.get("userToken") != "") {
      var data = this.cookieService.get("tokenTime")
      var diff = Math.floor(((Date.now() - parseInt(data)) / 1000) / 60);
      if (diff <= 10) {
        return true
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

  searchUserRecipes(searchText) {
    // http://localhost:8000/recipe/list/?search=burger2
    const searchUrl = this.getRecipeUrl + '?' + 'search' + '=' + searchText
    return this.http.get(searchUrl)
      .toPromise().then((data: any) => {
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to get: " + JSON.stringify(reason))
        return reason // callback(reason)
      });
  }

  loginUser(userDetails, saveIt) {
    return this.http.post(this.loginUrl, userDetails) // create http object
      .toPromise() // expect dat to come later
      .then((data: any) => { // after data arrive what should i do
        const jsonStr = data['tokens'].split("'").join("\"")
        var obj = JSON.parse(jsonStr);
        if (saveIt) {
          this.savedToken = obj.access
          this.cookieService.set('userToken', obj.access);
          this.cookieService.set("tokenTime", Date.now().toString())
        }
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to post: " + reason)
        return reason // callback(reason)
      });
  }

  registerUser(regUserDetails) {
    return this.http.post(this.regUrl, regUserDetails)
      .toPromise().then((data: any) => {
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to post: " + reason)
        return reason // callback(reason)
      });
  }

  ingredientsGet() {
    let headers = new HttpHeaders();
    if (this.savedToken != '') {
      headers = headers.set('Authorization', 'Bearer ' + this.savedToken)
    } else {
      headers = headers.set('Authorization', 'Bearer ' + this.guestToken)
    }

    headers.set('Accept', '*/*')
    headers.set('Host', 'localhost:4200')
    return this.http.get(this.ingredientUrl, {headers, responseType: 'text'})
      .toPromise().then((data: any) => {
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to get: " + JSON.stringify(reason))
        return reason // callback(reason)
      });

  }

  tagsGet() {
    let headers = new HttpHeaders();
    if (this.savedToken != '') {
      headers = headers.set('Authorization', 'Bearer ' + this.savedToken)
    } else {
      headers = headers.set('Authorization', 'Bearer ' + this.guestToken)
    }
    headers.set('Accept', '*/*')
    headers.set('Host', 'localhost:4200')

    return this.http.get(this.tagUrl, {headers})
      .toPromise().then((data: any) => {
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to get: " + JSON.stringify(reason))
        return reason // callback(reason)
      });
  }

  createNewIngredient(customIngredient) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.savedToken)
    return this.http.post(this.ingredientUrl, customIngredient, {headers})
      .toPromise().then((data: any) => {
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to get: " + JSON.stringify(reason))
        return reason // callback(reason)
      });
  }

  createNewTag(customTag) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.savedToken)
    return this.http.post(this.tagUrl, customTag, {headers})
      .toPromise().then((data: any) => {
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to get: " + JSON.stringify(reason))
        return reason // callback(reason)
      });
  }

  updateRecipe(recipeDetails) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.savedToken)
    // headers.set('Content-Type','application/json')
    headers.set('Content-Type', 'multipart/form-data')

    return this.http.post(this.createRecipeUrl, recipeDetails, {headers})
      .toPromise()
      .then((data: any) => {
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to post: " + reason)
        return reason // callback(reason)
      });

  }

  getRecipe() {
    return this.http.get(this.getRecipeUrl)
      .toPromise().then((data: any) => {
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to get: " + JSON.stringify(reason))
        return reason // callback(reason)
      });
  }


  deleteRecipe(url) {
    let newUrl = url.replace('detail', 'delete')
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.savedToken)
    headers.set('Accept', '*/*')
    headers.set('Host', 'localhost:4200')

    this.http.delete(newUrl, {headers})
      .toPromise().then((data: any) => {
      return data  // callback(data)
    }).catch(reason => { // i got back data
      console.log("failed to get: " + JSON.stringify(reason))
      return reason // callback(reason)
    });
  }

  logUserOut() {
    this.savedToken = '';
    this.cookieService.set('userToken', '');
  }

  getData() {
    const url = 'https://reqres.in/api/users?page=2';
    return this.http.get(url);
  }
}
