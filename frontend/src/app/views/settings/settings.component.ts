import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {
  public recipes: Recipe[];
  displayedColumns = ['name', 'description'];

  constructor(private recipeService: RecipeService, private router: Router) {}

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
}
