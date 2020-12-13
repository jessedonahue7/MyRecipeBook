import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {FormBuilder} from '@angular/forms'
import {UsersService} from 'src/app/users.service';
import {Router} from "@angular/router"
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  result: string;

  recipeData = [];
  item = [];
  createRecipeUrl = 'http://localhost:8000/recipe/create/';
  url = 'http://localhost:8000/recipe';

  listOfIngredients = [];
  listOfTags = [];
  newTags = [];
  selectedIds = [];
  recipeList = [];
  errorMsg;
  displayRecipe = [];
  json;
  selectedFile = null;
  tags = [];
  imageSrc;

  constructor(private rb: FormBuilder, private user: UsersService, private router: Router) {

  }

  ngOnInit() {

    this.getCreatedRecipe();
    this.getIngredients();
    this.getTags();
  }

  get f() {
    return this.recipeForm.controls;
  }


  recipeForm: FormGroup = this.rb.group({
    title: new FormControl('', Validators.required),
    tags: new FormControl(''),
    ingredients: new FormControl(''),
    cook_time: new FormControl('', Validators.required),
    prep_time: new FormControl('', Validators.required),
    image: new FormControl('', [Validators.required])
  });

  // tslint:disable-next-line:typedef
  async updateRecipe() {
    if (!this.recipeForm.valid) {
      this.errorMsg = "Please fill in correct credentials";
    }
    const map1 = this.selectedIds.map(x => x.id);
    const map2 = this.newTags.map(y => y.id);
    const formData = new FormData();
    formData.append('image', this.imageSrc);
    formData.append('title', this.recipeForm.value.title);
    formData.append('cook_time', this.recipeForm.value.cook_time);
    formData.append('prep_time', this.recipeForm.value.prep_time);
    for (var i = 0; i < map1.length; i++) {
      formData.append('ingredients', map1[i]);
    }
    for (var i = 0; i < map2.length; i++) {
      formData.append('tags', map2[i]);
    }
    const resp = await this.user.updateRecipe(formData);
    if (resp.id != undefined) {
      this.redirectTo('/form2-component');
    } else {
      this.errorMsg = "Unable to save your recipe"
    }
  }

  redirectTo(uri) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  async getIngredients() {
    const resp = await this.user.ingredientsGet();
    var obj = JSON.parse(resp);
    this.listOfIngredients = obj;
  }

  async getTags() {
    const resp = await this.user.tagsGet();
    this.listOfTags = resp;
  }

  async getCreatedRecipe() {
    const resp = await this.user.getRecipe();
    this.tags = resp;
    this.recipeList = resp.results;

    // this.recipeList.forEach(l => {
    //   this.getTagsNames(l.tags)
    // })
    //
    // this.recipeList.forEach(l => {
    //   this.getIngredientsNames(l.ingredients)
    // })

  }


  getTagsNames(listOfTagIds) {

    const tagsNames = this.listOfTags
      .map(name => {
        if (listOfTagIds.includes(name.id)) {
          return name.name
        }
      }).filter(name => name != null)
    return tagsNames
  }

  getIngredientsNames(listOfIngredientIds) {
    const ingredientNames = this.listOfIngredients
      .map(name => {
        if (listOfIngredientIds.includes(name.id)) {
          return name.name
        }
      }).filter(name => name != null)
    return ingredientNames
  }

  addNewIngrdeient = async (name) => {
    const newIng = {
      name: name
    };
    const resp = await this.user.createNewIngredient(newIng);
    return resp
  }

  addNewTags = async (name) => {
    const newTag = {
      name: name
    };
    const resp = await this.user.createNewTag(newTag);
    return resp
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageSrc = file;
    }
  }


  // tslint:disable-next-line:typedef
  onSubmit() {

  }


}
