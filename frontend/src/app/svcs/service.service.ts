import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get(`${this.uri}/services`);
  }

  getServiceById(id) {
    return this.http.get(`${this.uri}/services/${id}`);
  }
}
