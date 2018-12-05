import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  templateUrl: 'generator.component.html'
})
export class GeneratorComponent implements OnInit {

  max: number = 5;
  dynamic: number = 1;

  clusterTypes = ['../../../assets/img/hwx/icon-hdp.png',
                  '../../../assets/img/hwx/icon-dataflow.png',
                  '../../../assets/img/hwx/hdf-hdp-connected-sq2.png'
  ];
  showClusterTypes = true;
  showRecipes = false;
  showOptions = false;
  showSize = false;
  showGenerate = false;

  public recipes: Recipe[];
  displayedColumns = ['name', 'description'];

  nodeTypes = ['Master', 'Worker'];

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

  clusterTypeSelect() {
    this.showClusterTypes = false;
    this.showSize = true;
    this.dynamic++;
  }

  setSize() {
    this.showSize = false;
    this.showRecipes = true;
    this.dynamic++;
  }

  addRecipes() {
    this.showRecipes = false;
    this.showOptions = true;
    this.dynamic++;
  }

  addOptions() {
    this.showOptions = false;
    this.showGenerate = true;
    this.dynamic++;
  }

  genBundle() {
    this.showGenerate = false;
    this.showClusterTypes = true;
    this.dynamic = 1;
  }
}
