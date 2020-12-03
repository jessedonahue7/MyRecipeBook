import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {FormBuilder} from '@angular/forms'
import {UsersService} from 'src/app/users.service';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

  result: string;
  postData = {
    id: '1',
    title: 'Chicken',
    tags: '1',
    cook_time: '30',
    prep_time: '25',
    Ingredients: '3 cups sugar'
  };

  recipeData = [];
  item = [];
  createRecipeUrl = 'http://localhost:8000/recipe/create/';
  url = 'http://localhost:8000/recipe';

  listOfIngredients = [];
  listOfTags = [];
  newTags = [];
  selectedIds = [];
  recipeList = [];

  displayRecipe = [];
  errorMsg;
  json;

  tags = [];

  constructor(private rb: FormBuilder, private user: UsersService) {
    this.getIngredients();
    this.getTags();
    this.getCreatedRecipe();
  }

  ngOnInit() {

  }

  recipeForm: FormGroup = this.rb.group({
    title: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    cook_time: new FormControl('', Validators.required),
    prep_time: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required)
  });

  // tslint:disable-next-line:typedef
  async updateRecipe() {
    const map1 = this.selectedIds.map(x => x.id);
    const map2 = this.newTags.map(y => y.id);
    const newRes = {
      title: this.recipeForm.value.title,
      ingredients: map1,
      tags: map2,
      cook_time: this.recipeForm.value.cook_time,
      prep_time: this.recipeForm.value.prep_time
    };
    console.log(newRes)
    const resp = await this.user.updateRecipe(newRes);
    console.log(resp)
    return resp;

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

    console.log(JSON.stringify(resp))
    this.tags = resp;
    this.recipeList = resp.results;

    this.recipeList.forEach(l => {
      var t = this.getTagsNames(l.tags)
      console.log(t);
    })

    this.recipeList.forEach(l => {
      var i = this.getIngredientsNames(l.ingredients)
      console.log(i);
    })

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
    console.log(listOfIngredientIds)
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
    console.log(JSON.stringify(resp))
    return resp
  }

  addNewTags = async (name) => {
    const newTag = {
      name: name
    };
    const resp = await this.user.createNewTag(newTag);
    console.log(JSON.stringify(resp))
    return resp
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.recipeForm.value);
  }


}
