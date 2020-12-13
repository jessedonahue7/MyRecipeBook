import { Component, OnInit , Input} from '@angular/core';
import {UsersService} from "../users.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  recipeDetails = [];
  listOfIngredients = [];
  listOfTags = [];
  tags;
  title;
  cook_time;
  prep_time;
  ingredients;

  constructor(private user: UsersService,private rb: FormBuilder) {
    this.getRecipeDetails();
  }

  ngOnInit(): void {
  }

  recipeForm: FormGroup = this.rb.group({
    title: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    cook_time: new FormControl('', Validators.required),
    prep_time: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required)
  });

  async getRecipeDetails() {
    const resp = await this.user.getRecipe();
    this.tags = resp;
    this.recipeDetails = resp.results;

    this.recipeDetails.forEach(l => {
      this.getTagsNames(l.tags)

    })

    this.recipeDetails.forEach(l => {
     this.getIngredientsNames(l.ingredients);
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
    const ingredientNames = this.listOfIngredients
      .map(name => {
        if (listOfIngredientIds.includes(name.id)) {
          return name.name
        }
      }).filter(name => name != null)
    return ingredientNames
  }


}
