import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FilewriterService {
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

  writeFile(filename,content) {
    //console.log('Writer recieved: ', content)
    //return this.http.get(`${this.uri}/filewriter/${filename}/${content}`);

    //return
    this.http.post(`${this.uri}/filewriter/${filename}`, content, httpOptions).subscribe(
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
    //return this.http.post(`${this.uri}/filewriter`,content,httpOptions);
  }
}
