import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlueprintService {
  //uri = 'http://backend:4000';

  constructor(private http: HttpClient) { }

  getAbsoluteDomainUrl(): string {
    if (window
        && "location" in window
        && "protocol" in window.location
        && "host" in window.location) {
          console.log("HOSTNAME ", window.location.hostname);
        return window.location.protocol + "//" + window.location.hostname;
    }
    return null;
  }

  uri = this.getAbsoluteDomainUrl() + ':4000';

  getBlueprints() {
    return this.http.get(`${this.uri}/components_blueprints`);
  }

  getBlueprintById(id) {
    return this.http.get(`${this.uri}/components_blueprints/${id}`);
  }

  getBlueprintsForService(id) {
    return this.http.get(`${this.uri}/components_blueprints/service/${id}`);
  }
}
