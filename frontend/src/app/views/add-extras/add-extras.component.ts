import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'

interface Recipe {
  recipeType: string,
  clusterType: string,
  clusterVersion: string,
  service: string,
  code: string
}

@Component({
  templateUrl: 'add-extras.component.html'
})
export class AddExtrasComponent implements OnInit {
  constructor( private router: Router) {}

  ngOnInit(): void {
  }

  extraTypes: String[] = ['Recipe','NiFi Template', 'Zeppelin Notebook', 'SQL']
  recipeTypes: String[] = ['Pre-Ambari','Post-Ambari', 'Post-cluster install', 'On termination']
  clusterTypes: String[] = ['HDP', 'HDF', 'HDP+HDF']
  serviceTypes: String[] = []


  public showRecipe = true;
  public showNifi = true;
  public showZep = true;
  public showSQL = true;

  addExtra({value, valid}:{value: Recipe, valid: boolean}) {
    console.log(value)
  }

  selectExtra() {

  }
}
