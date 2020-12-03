import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  json;
  loginUrl = 'http://localhost:8000/login/'
  regUrl = 'http://localhost:8000/register/'
  recipeUrl = 'http://localhost:8000/recipe/'
  ingredientUrl = 'http://localhost:8000/recipe/ingredients/'
  tagUrl = 'http://localhost:8000/recipe/tags/'
  createRecipeUrl = 'http://localhost:8000/recipe/create/'
  getRecipeUrl = 'http://localhost:8000/recipe/list/?page=5'

  savedToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEyODg5MTk0LCJqdGkiOiJlYjQwOTZmZTkyZmI0NWQ2ODFlYzZiMTU1ZGQyNTk5NCIsInVzZXJfaWQiOjh9.d9Ohr2MGR38Wel_l4JqwLm6j03xEprzTcltNHUb1Uvk"

  constructor(private http: HttpClient) {

  }

  loginUser(userDetails) {
    return this.http.post(this.loginUrl, userDetails) // create http object
      .toPromise() // expect dat to come later
      .then((data: any) => { // after data arrive what should i do
        console.log('--------------------------');
        const jsonStr = data['tokens'].split("'").join("\"")
        console.log(jsonStr)
        var obj = JSON.parse(jsonStr);
        this.savedToken = obj.access
        console.log(obj.access)
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to post: " + reason)
        return reason // callback(reason)
      });
  }

  registerUser(regUserDetails) {
    return this.http.post(this.regUrl, regUserDetails)
      .toPromise().then((data: any) => {
        console.log('--------------------------');
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to post: " + reason)
        return reason // callback(reason)
      });
  }

  ingredientsGet() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.savedToken)
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
    headers = headers.set('Authorization', 'Bearer ' + this.savedToken)
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
    headers.set('Content-Type','application/json')
    let json = JSON.stringify(recipeDetails)
    return this.http.post(this.createRecipeUrl, recipeDetails,{headers})
      .toPromise()
      .then((data: any) => {
        console.log('---------');
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to post: " + reason)
        return reason // callback(reason)
      });

  }

  getRecipe(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.savedToken)
    headers.set('Accept', '*/*')
    headers.set('Host', 'localhost:4200')

    return this.http.get(this.getRecipeUrl, {headers})
      .toPromise().then((data: any) => {
        return data  // callback(data)
      }).catch(reason => { // i got back data
        console.log("failed to get: " + JSON.stringify(reason))
        return reason // callback(reason)
      });


  }

  deleteRecipe(){

  }


  getData() {
    const url = 'https://reqres.in/api/users?page=2';
    return this.http.get(url);
  }
}
