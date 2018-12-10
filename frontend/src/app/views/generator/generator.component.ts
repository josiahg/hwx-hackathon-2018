import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

import { Blueprint } from '../../svcs/blueprint.model';
import { BlueprintService } from '../../svcs/blueprint.service';

import { Service } from '../../svcs/service.model';
import { ServiceService } from '../../svcs/service.service';

interface ClusterType {
  id: String;
  img: String;
};

@Component({
  templateUrl: 'generator.component.html'
})
export class GeneratorComponent implements OnInit {

  max: number = 5;
  dynamic: number = 1;

  clusterTypes: ClusterType[] = [{'id':'1','img':'../../../assets/img/hwx/icon-hdp.png'},
                  {'id':'2','img':'../../../assets/img/hwx/icon-dataflow.png'},
                  {'id':'3','img':'../../../assets/img/hwx/hdf-hdp-connected-sq2.png'}
  ];
  showClusterTypes = true;
  showServices = false;
  showOptions = false;
  showSize = false;
  showGenerate = false;
  clusterType = 0;

  public recipes: Recipe[];
  displayedColumns = ['name', 'description'];

  nodeTypes = ['Master', 'Worker'];

  constructor(private recipeService: RecipeService,
              private blueprintService: BlueprintService,
              private serviceService: ServiceService) {};


  public blueprints: Blueprint[];
  public services: Service[];

  selectedServices = new Map<number, boolean>();

  ngOnInit(): void {
    //this.fetchRecipes();
    this.fetchBlueprintsForService(1);
    console.log(this.blueprints);
  }

  fetchServicesForClusterType(id) {
    this.serviceService
    .getServiceById(id)
    .subscribe((data: Service[]) => {
      this.services = data;
      console.log('Service data requested...');
      console.log(this.services);
    })
  }

  fetchBlueprintsForService(id) {
    this.blueprintService
    .getBlueprintsForService(id)
    .subscribe((data: Blueprint[]) => {
      this.blueprints = data;
      console.log('Blueprint data requested ... ');
      console.log(this.blueprints);
    })
  }

  fetchNeededBlueprints() {
    console.log("Fetching blueprints...");
    Object.keys(this.selectedServices).forEach(svc => {
      console.log(svc, this.selectedServices[svc])
      if(this.selectedServices[svc]) {
        this.fetchBlueprintsForService(svc)
      }
    })
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

  clusterTypeSelect(id) {
    console.log('Type is ' + id)
    this.fetchServicesForClusterType(id);
    this.clusterType = id;
    this.showClusterTypes = false;
    this.showSize = true;
    this.dynamic++;
  }

  addServicesToMap() {
    this.services.forEach(value => {
      this.selectedServices[value.id] = !!value.mandatory;
    })
  }

  updateServiceSelected(id) {
    this.selectedServices[id] = !this.selectedServices[id];
    console.log("Servics: ", JSON.stringify(this.selectedServices));
  }

  setSize() {
    this.showSize = false;
    this.showServices = true;
    this.dynamic++;
    this.addServicesToMap();
  }

  addServices() {
    this.showServices = false;
    this.showOptions = true;
    this.dynamic++;
    this.fetchNeededBlueprints();
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
