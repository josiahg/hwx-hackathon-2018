import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { AddExtra } from '../../svcs/add-extras.model';
import { AddExtraService } from '../../svcs/add-extras.service';

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
  constructor( private addExtraService: AddExtraService) {}

  ngOnInit(): void {
    this.getAllServicesTypes();
  }

  public serviceTypes: AddExtra[];
  getAllServicesTypes(){
    this.addExtraService
    .getDistinctServices()
    .subscribe((data: AddExtra[]) => {
      this.serviceTypes= data;
      console.log('Data requested ... ');
      console.log(this.serviceTypes);
    });
    
  }
  extraTypes: String[] = ['Recipe','NiFi Template', 'Zeppelin Note', 'SQL']
  recipeTypes: String[] = ['Pre-Ambari','Post-Ambari', 'Post-cluster install', 'On termination']
  clusterTypes: String[] = ['HDP', 'HDF', 'HDP+HDF']
  sqlServiceTypes: String[] = ['HIVE', 'HBASE']

  public showRecipe = false;
  public showNifi = false;
  public showZep = false;
  public showSQL = false;
  public showExtras = true;

  addExtra({value, valid}:{value: Recipe, valid: boolean}) {
    console.log(value)
  }
  addNifiTemplate(form){
    console.log('{ "cluster_type": "'+ form.form.value.cluster_type +'",  "template": "'+ form.form.value.code +'" }');
    //this.addExtraService.setCustomRecipe('{ "recipe_type": "'+ form.form.value.recipe_type + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
  }

  addZeppelinNote(form){
    console.log('{ "cluster_type": "'+ form.form.value.cluster_type +'",  "template": "'+ form.form.value.code +'" }');
    //this.addExtraService.setCustomRecipe('{ "recipe_type": "'+ form.form.value.recipe_type + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
  }
  addCustomRecipe(form){
    console.log('{ "recipe_type": "'+ form.form.value.recipe_type + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
    //this.addExtraService.setCustomRecipe('{ "recipe_type": "'+ form.form.value.recipe_type + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
  }
  addSQLScript(form){
    console.log('{ cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
    //this.addExtraService.setCustomRecipe('{ "recipe_type": "'+ form.form.value.recipe_type + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
  }


  selectExtra(form) {
     if (form.form.value.extraSelected=="Recipe"){
       this.showRecipe = true;
       this.showExtras = false;
     } else if (form.form.value.extraSelected=="NiFi Template"){
      this.showNifi = true;
      this.showExtras = false;
    } else if (form.form.value.extraSelected=="Zeppelin Note"){
      this.showZep = true;
      this.showExtras = false;
    } else if (form.form.value.extraSelected=="SQL"){
      this.showSQL = true;
      this.showExtras = false;
    }

     
  }

  cancelAdd() {
    this.showRecipe = false;
    this.showNifi = false;
    this.showZep = false;
    this.showSQL = false;
    this.showExtras = true;
  
  }
}