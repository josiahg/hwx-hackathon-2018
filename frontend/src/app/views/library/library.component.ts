import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  templateUrl: 'library.component.html'
})
export class LibraryComponent implements OnInit {

  public recipes: Recipe[];
  displayedColumns = ['name', 'description'];
  showLibraryItems: boolean = true;
  showItemDetails: boolean = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes(){
    this.recipeService
    .getRecipes()
    .subscribe((data: Recipe[]) => {
      this.recipes = data;
      console.log('Data requested ... ');
      console.log(this.recipes);
    });
  }

  selectedRecipeCode = "some code"

  selectedRecipe: any = {};
  rec: Recipe;

  displayLibrary() {
    this.showLibraryItems = true;
    this.showItemDetails = false;
  }

  displayItem(id) {
    this.showLibraryItems = false;
    this.showItemDetails = true;
    console.log('Clicked item ' + id);
    this.recipeService.getRecipeById(id).subscribe(res => {
      this.selectedRecipe = res;
      this.rec = (res as Recipe);
      console.log(this.rec.code);
      //this.selectedRecipeCode = res.code;
    })
  }
}
