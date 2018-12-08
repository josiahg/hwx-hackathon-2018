import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlueprintService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

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
