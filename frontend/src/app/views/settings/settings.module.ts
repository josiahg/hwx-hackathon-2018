import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    SettingsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule
  ],
  declarations: [ SettingsComponent ]
})
export class SettingsModule { } 
