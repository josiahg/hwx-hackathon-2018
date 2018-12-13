import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  //uri = 'http://backend:4000';

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

  getServices() {
    return this.http.get(`${this.uri}/services`);
  }

  getServiceById(id) {
    return this.http.get(`${this.uri}/services/${id}`);
  }
  /*getServiceByClusterTypeAndDescription(cluster_type, description) {
    return this.http.get(`${this.uri}/services/${cluster_type}/${description}`);
  }
  setCustomRecipe(body) {
    return this.http.post(`${this.uri}/set_custom_recipe`, body, httpOptions).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
        window.location.reload();
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }*/
}
