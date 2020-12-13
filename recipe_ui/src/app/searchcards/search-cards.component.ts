import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-searchcards',
  templateUrl: './search-cards.component.html',
  styleUrls: ['./search-cards.component.css']
})
export class SearchCardsComponent implements OnInit {

  search: string;
  recipeList: [];
  listOfTags = [];
  listOfIngredients = [];

  constructor(private actRoute: ActivatedRoute, private user: UsersService) {

  }

  ngOnInit(): void {
    this.search = this.actRoute.snapshot.params.txt;
    this.getIngredients();
    this.getTags();
    this.loadSearchData();
  }

  async loadSearchData() {
    const resp = await this.user.searchUserRecipes(this.search);
    this.recipeList = resp.results;

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

  getTagsNames(listOfTagIds) {
    const tagsNames = this.listOfTags
      .map(name => {
        if (listOfTagIds.includes(name.id)) {
          return name.name
        }
      }).filter(name => name != null)
    return tagsNames
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
}
