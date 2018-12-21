import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as GenBlueprint from '../svcs/generated-blueprint.model'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

  getAbsoluteDomainUrl(): string {
    if (window
        && "location" in window
        && "protocol" in window.location
        && "host" in window.location) {
        return window.location.protocol + "//" + window.location.hostname;
    }
    return null;
  }

  uri = this.getAbsoluteDomainUrl() + ':4000';

  buildBlueprintFromServices() {

  }
}
