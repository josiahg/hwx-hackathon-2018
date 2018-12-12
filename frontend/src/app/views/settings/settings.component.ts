import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { CloudbreakCredentials } from '../../svcs/cloudbreakcredentials.model';
import { CloudbreakCredentialsService } from '../../svcs/cloudbreakcredentials.service';


@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {


  public cloudbreakCredentials: CloudbreakCredentials[];

  showListCredentials = true;
  showAddCredentials = false;
  showModifyCredentials = false;



  constructor(private cloudbreakCredentialsService: CloudbreakCredentialsService) {}
  ngOnInit(): void {
    this.getCredentials();
  }

  getCredentials(){
    this.cloudbreakCredentialsService
    .getAllCredentials()
    .subscribe((data: CloudbreakCredentials[]) => {
      this.cloudbreakCredentials = data;
      console.log('Data requested ... ');
      console.log(this.cloudbreakCredentials);
    });
  }

  addCredentials(form){
    
    this.cloudbreakCredentialsService.setCredentials('{ "instance_name": "'+ form.form.value.instance_name +'", "cb_url": "'+ form.form.value.cb_url +'",  "cb_username": "'+ form.form.value.cb_username +'", "cb_password": "'+ form.form.value.cb_password +'" }');
  }

  deleteCredential(cred_id){
    
    var test = this.cloudbreakCredentialsService
    .deleteCredentials('{ "cred_id": "'+ cred_id +'" }');
    
    
  }

  toggleAdd(){
  
    this.showAddCredentials = !this.showAddCredentials;
    
  }

}
