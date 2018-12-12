import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  templateUrl: 'add-extras.component.html'
})
export class AddExtrasComponent implements OnInit {
  constructor( private router: Router) {}

  ngOnInit(): void {
  }
}
