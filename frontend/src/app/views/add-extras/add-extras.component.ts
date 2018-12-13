import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { AddExtra } from '../../svcs/add-extras.model';
import { AddExtraService } from '../../svcs/add-extras.service';
import { Service } from '../../svcs/service.model';
import { ServiceService } from '../../svcs/service.service';

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


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
  constructor(private addExtraService: AddExtraService,
    private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.getAllServicesTypes();
  }

  public serviceTypes: AddExtra[];
  getAllServicesTypes() {
    this.addExtraService
      .getDistinctServices()
      .subscribe((data: AddExtra[]) => {
        this.serviceTypes = data;
        console.log('Data requested ... ');
        console.log(this.serviceTypes);
      });

  }
  extraTypes: String[] = ['Recipe', 'NiFi Template', 'Zeppelin Note', 'SQL']
  recipeTypes: String[] = ['Pre-Ambari', 'Post-Ambari', 'Post-cluster install', 'On termination']
  clusterTypes: String[] = ['HDP', 'HDF', 'HDP+HDF']
  sqlServiceTypes: String[] = ['HIVE', 'HBASE']

  public showRecipe = false;
  public showNifi = false;
  public showZep = false;
  public showSQL = false;
  public showExtras = true;
  public services: Service[] = [];

  addExtra({ value, valid }: { value: Recipe, valid: boolean }) {
    console.log(value)
  }
  addNifiTemplate(form) {
    console.log('{ name": "' + form.form.value.name + '", cluster_type": "' + form.form.value.cluster_type + '",  "template": "' + form.form.value.code + '" }');
    //this.addExtraService.setCustomRecipe('{ "recipe_type": "'+ form.form.value.recipe_type + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
  }

  addZeppelinNote(form) {
    console.log('{ name": "' + form.form.value.name + '", "cluster_type": "' + form.form.value.cluster_type + '",  "template": "' + form.form.value.code + '" }');
    //this.addExtraService.setCustomRecipe('{ "recipe_type": "'+ form.form.value.recipe_type + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
  }
  addCustomRecipe(form) {
    var recType = "";
    if (form.form.value.recipe_type == "Pre-Ambari") {
      recType = "pre_ambari_start";
    } else if (form.form.value.recipe_type == "Post-Ambari") {
      recType = "post_ambari_start";
    } else if (form.form.value.recipe_type == "Post-cluster install") {
      recType = "post_cluster_install";
    } else if (form.form.value.recipe_type == "On termination") {
      recType = "on_termination";
    }
    var extraType = "Custom Recipe";

    // TO-DO Implement Service ID
<<<<<<< HEAD
    this.serviceService
    .getServiceByClusterTypeAndDescription(form.form.value.cluster_type, form.form.value.service_type)
    .subscribe((data: Service[]) => {
      this.services = data;
      console.log('Service data requested...');
      console.log(this.services);
      this.services.forEach(function(value, key) {
        console.log('{ serviceId": "'+ value.id +'", "recipe_description": "'+ form.form.value.name + '", "extra_type": "'+ extraType +'",  "recType": "'+ recType +'", "recipe": "'+ form.form.value.code +'" }');
        var body = '{ serviceId": "'+ value.id +'", "recipe_description": "'+ form.form.value.name + '", "extra_type": "'+ extraType +'",  "recType": "'+ recType +'", "recipe": "'+ form.form.value.code +'" }';
      })
    })
    this.services.forEach(function(value, key) {
      console.log('{ serviceId": "'+ value.id +'", "recipe_description": "'+ form.form.value.name + '", "extra_type": "'+ extraType +'",  "recType": "'+ recType +'", "recipe": "'+ form.form.value.code +'" }');
      var body = '{ serviceId": "'+ value.id +'", "recipe_description": "'+ form.form.value.name + '", "extra_type": "'+ extraType +'",  "recType": "'+ recType +'", "recipe": "'+ form.form.value.code +'" }';
    })

    console.log('{ name": "'+ form.form.value.name +'", "recType": "'+ recType + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
=======
    // this.serviceService
    //   .getServiceByClusterTypeAndDescription(form.form.value.cluster_type, form.form.value.service_type)
    //   .subscribe((data: Service[]) => {
    //     this.services = data;
    //     console.log('Service data requested...');
    //     console.log(this.services);
    //     this.services.forEach(function (value, key) {
    //       console.log('{ serviceId": "' + value.id + '", "recipe_description": "' + form.form.value.name + '", "extra_type": "' + extraType + '",  "recType": "' + recType + '", "recipe": "' + form.form.value.code + '" }');
    //       var body = '{ serviceId": "' + value.id + '", "recipe_description": "' + form.form.value.name + '", "extra_type": "' + extraType + '",  "recType": "' + recType + '", "recipe": "' + form.form.value.code + '" }';

    //       return this.http.post(`${this.uri}/set_custom_recipe`, body, httpOptions).subscribe(
    //         (val) => {
    //           console.log("POST call successful value returned in body",
    //             val);
    //           window.location.reload();
    //         },
    //         response => {
    //           console.log("POST call in error", response);
    //         },
    //         () => {
    //           console.log("The POST observable is now completed.");
    //         });

    //     })
    //   })



    console.log('{ name": "' + form.form.value.name + '", "recType": "' + recType + '", "cluster_type": "' + form.form.value.cluster_type + '",  "service_type": "' + form.form.value.service_type + '", "code": "' + form.form.value.code + '" }');
>>>>>>> 4f42528bc5f54d8cd0588787327d6b8717a1cfcb
    //this.addExtraService.setCustomRecipe('{ "recipe_type": "'+ form.form.value.recipe_type + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
  }
  addSQLScript(form) {


    console.log('{ name": "' + form.form.value.name + '", cluster_type": "' + form.form.value.cluster_type + '",  "service_type": "' + form.form.value.service_type + '", "code": "' + form.form.value.code + '" }');
    //this.addExtraService.setCustomRecipe('{ "recipe_type": "'+ form.form.value.recipe_type + '", "cluster_type": "'+ form.form.value.cluster_type +'",  "service_type": "'+ form.form.value.service_type +'", "code": "'+ form.form.value.code +'" }');
  }


  selectExtra(form) {
    if (form.form.value.extraSelected == "Recipe") {
      this.showRecipe = true;
      this.showExtras = false;
    } else if (form.form.value.extraSelected == "NiFi Template") {
      this.showNifi = true;
      this.showExtras = false;
    } else if (form.form.value.extraSelected == "Zeppelin Note") {
      this.showZep = true;
      this.showExtras = false;
    } else if (form.form.value.extraSelected == "SQL") {
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
