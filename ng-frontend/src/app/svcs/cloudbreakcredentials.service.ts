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
export class CloudbreakCredentialsService {
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

  getAllCredentials() {
    return this.http.get(`${this.uri}/cbcreds/read`);
  }

  getAllCredentialsP() {
    return this.http.get(`${this.uri}/cbcreds/read`).toPromise();
  }

  setCredentials(body) {
    return this.http.post(`${this.uri}/cbcreds/set`, body, httpOptions).subscribe(
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
  }

  deleteCredentials(body) {
    return this.http.post(`${this.uri}/cbcreds/delete`, body, httpOptions).subscribe(
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
  }
}
