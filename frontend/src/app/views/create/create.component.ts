import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


import { NgForm } from '@angular/forms';

@Component({
  templateUrl: 'create.component.html'
})
export class CreateComponent implements OnInit {
  displayedColumns = ['name', 'description'];

  constructor( private router: Router) {}

  ngOnInit(): void {
  }

  /*addRecipe(f: NgForm) {
    this.recipeService.addRecipe(f.value.name,f.value.description,f.value.code).subscribe(() => {
      this.router.navigate(['settings']);
    });
  }*/
}
