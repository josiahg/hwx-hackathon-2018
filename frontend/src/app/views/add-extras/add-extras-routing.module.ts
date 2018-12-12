import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExtrasComponent } from './add-extras.component';

const routes: Routes = [
  {
    path: '',
    component: AddExtrasComponent,
    data: {
      title: 'Add Extras'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExtrasRoutingModule {}
