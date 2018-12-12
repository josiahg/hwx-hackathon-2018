import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }


}
