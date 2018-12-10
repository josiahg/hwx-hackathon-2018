import { Component, OnInit, NgModule } from '@angular/core';
import { JsonPipe } from '@angular/common'
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

import { Blueprint } from '../../svcs/blueprint.model';
import { BlueprintService } from '../../svcs/blueprint.service';

import { Service } from '../../svcs/service.model';
import { ServiceService } from '../../svcs/service.service';

import * as GenBlueprint from '../../svcs/generated-blueprint.model';
import { BsComponentRef } from 'ngx-bootstrap/component-loader/public_api';

interface ClusterType {
  id: String;
  img: String;
};

interface BPComp {
  name: string;
};

interface HostGroup {
  name: string;
  configurations: any[];
  components: any[];
  cardinality: string;
};

interface Configuration {
  config: String;
}

interface GenBlueprint {
  Blueprints: any;
  //settings: Setting[];
  configurations: Configuration[];
  host_groups: HostGroup[];
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


  public blueprints: Blueprint[] = [];
  public services: Service[];

  public generated: any[] = [];

  selectedServices = new Map<number, boolean>();

  // remove this
  public host_groups: HostGroup[] = [];
  public hg_master: HostGroup = { 'name':'master', 'cardinality':'1', 'components':[] } as HostGroup;
  public hg_worker: HostGroup = { 'name':'worker', 'cardinality':'1+', 'components':[] } as HostGroup;
  public hg_compute: HostGroup = { 'name':'compute', 'cardinality':'1+', 'components':[] } as HostGroup;
  public gen_bp: GenBlueprint = {} as GenBlueprint;
  // /remove this

  ngOnInit(): void {
    //this.fetchRecipes();
    this.fetchBlueprintsForService(1);
    console.log(this.blueprints);
    this.gen_bp.Blueprints = {'blueprint_name': 'test_gen_1', 'stack_name':'HDP', 'stack_version':'3.0'};
    this.gen_bp.configurations = [];
    /*this.hg_master.name = 'master';
    this.hg_master.cardinality = '1';
    this.hg_master.components = [];*/
    this.gen_bp.host_groups = this.host_groups;
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

  stringToBPComp(str): BPComp {
    let obj = JSON.parse(str);
    return obj as BPComp;
  }

  fetchBlueprintsForService(id) {
    this.blueprintService
    .getBlueprintsForService(id)
    .subscribe((data: Blueprint[]) => {
      console.log('Blueprint data requested ... ');
      //console.log('Data', data);
      data.forEach(bp => {
        this.generated.push(bp)
        if(bp.master_blueprint.length > 0) {
          // console.log('BPComp:',this.stringToBPComp(bp.master_blueprint));
          this.hg_master.components.push(this.stringToBPComp(bp.master_blueprint))
        }
        if(bp.worker_blueprint.length > 0) {
          // console.log('BPComp:',this.stringToBPComp(bp.worker_blueprint));
          this.hg_worker.components.push(this.stringToBPComp(bp.worker_blueprint))
        }
        if(bp.compute_blueprint.length > 0) {
          // console.log('BPComp:',this.stringToBPComp(bp.compute_blueprint));
          this.hg_compute.components.push(this.stringToBPComp(bp.compute_blueprint))
        }
      })
      // Dedupe the lists of components
      this.hg_master.components = this.hg_master.components.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.name === thing.name && t.name === thing.name
        ))
      )
      this.hg_worker.components = this.hg_worker.components.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.name === thing.name && t.name === thing.name
        ))
      )
      this.hg_compute.components = this.hg_compute.components.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.name === thing.name && t.name === thing.name
        ))
      )
    })
  }

  genBlueprint() {
    this.host_groups.push(this.hg_master);
    this.host_groups.push(this.hg_worker);
    this.host_groups.push(this.hg_compute);
    this.gen_bp.host_groups = this.host_groups;
    console.log(this.gen_bp);
    console.log(JSON.stringify(this.gen_bp))
  }

  /*parseMasterBlueprints() {
    this.hg_master.name = "master";
    this.hg_master.components = [];
    this.blueprints.forEach((value: Blueprint) => {
      console.log("master_blu: ", value.master_blueprint);
      this.hg_master.components.push(value.master_blueprint);
    })
    console.log(JSON.stringify(this.host_groups));
  }*/

  fetchNeededBlueprints() {
    console.log("Fetching blueprints...");
    Object.keys(this.selectedServices).forEach(svc => {
      if(this.selectedServices[svc]) {
        this.fetchBlueprintsForService(svc);
      }
    });
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
    //console.log("Servics: ", JSON.stringify(this.selectedServices));
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
    this.genBlueprint();
  }
}
