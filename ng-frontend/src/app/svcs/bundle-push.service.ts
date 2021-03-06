import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { encode } from 'punycode';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

interface BPBody {
  cb_url: string;
  token: string;
  bp_base64: string;
  cluster_name: string;
};
/*{
    "cb_url": "18.188.99.82",
    "token": "eyJhbGciOiJIUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiIxZTE5YzcxNTFmZTU0NzU3OTQzZjE5ZTA5ZjM3NmQ2MSIsInN1YiI6ImFiZTVkYjA4LWI2OWMtNDQ5OC1hYTFiLTg1YzQ5OWMyYTk1YyIsInNjb3BlIjpbImNsb3VkYnJlYWsubmV0d29ya3MucmVhZCIsInBlcmlzY29wZS5jbHVzdGVyIiwiY2xvdWRicmVhay51c2FnZXMudXNlciIsImNsb3VkYnJlYWsucmVjaXBlcyIsImNsb3VkYnJlYWsudXNhZ2VzLmdsb2JhbCIsIm9wZW5pZCIsImNsb3VkYnJlYWsucGxhdGZvcm1zIiwiY2xvdWRicmVhay50ZW1wbGF0ZXMucmVhZCIsImNsb3VkYnJlYWsudXNhZ2VzLmFjY291bnQiLCJjbG91ZGJyZWFrLnN0YWNrcy5yZWFkIiwiY2xvdWRicmVhay5ldmVudHMiLCJjbG91ZGJyZWFrLmJsdWVwcmludHMiLCJjbG91ZGJyZWFrLm5ldHdvcmtzIiwiY2xvdWRicmVhay50ZW1wbGF0ZXMiLCJjbG91ZGJyZWFrLnNzc2Rjb25maWdzIiwiY2xvdWRicmVhay5wbGF0Zm9ybXMucmVhZCIsImNsb3VkYnJlYWsuY3JlZGVudGlhbHMucmVhZCIsImNsb3VkYnJlYWsuc2VjdXJpdHlncm91cHMucmVhZCIsImNsb3VkYnJlYWsuc2VjdXJpdHlncm91cHMiLCJjbG91ZGJyZWFrLnN0YWNrcyIsImNsb3VkYnJlYWsuY3JlZGVudGlhbHMiLCJjbG91ZGJyZWFrLnJlY2lwZXMucmVhZCIsImNsb3VkYnJlYWsuc3NzZGNvbmZpZ3MucmVhZCIsImNsb3VkYnJlYWsuYmx1ZXByaW50cy5yZWFkIl0sImNsaWVudF9pZCI6ImNsb3VkYnJlYWtfc2hlbGwiLCJjaWQiOiJjbG91ZGJyZWFrX3NoZWxsIiwiYXpwIjoiY2xvdWRicmVha19zaGVsbCIsInVzZXJfaWQiOiJhYmU1ZGIwOC1iNjljLTQ0OTgtYWExYi04NWM0OTljMmE5NWMiLCJvcmlnaW4iOiJ1YWEiLCJ1c2VyX25hbWUiOiJwdmlkYWxAaG9ydG9ud29ya3MuY29tIiwiZW1haWwiOiJwdmlkYWxAaG9ydG9ud29ya3MuY29tIiwiYXV0aF90aW1lIjoxNTQ0NjU2MjU0LCJyZXZfc2lnIjoiNmUzNWNmOTkiLCJpYXQiOjE1NDQ2NTYyNTQsImV4cCI6MTU0NDY5OTQ1NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3VhYS9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJjbG91ZGJyZWFrX3NoZWxsIiwiY2xvdWRicmVhay5yZWNpcGVzIiwib3BlbmlkIiwiY2xvdWRicmVhayIsImNsb3VkYnJlYWsucGxhdGZvcm1zIiwiY2xvdWRicmVhay5ibHVlcHJpbnRzIiwiY2xvdWRicmVhay50ZW1wbGF0ZXMiLCJjbG91ZGJyZWFrLm5ldHdvcmtzIiwicGVyaXNjb3BlIiwiY2xvdWRicmVhay5zc3NkY29uZmlncyIsImNsb3VkYnJlYWsudXNhZ2VzIiwiY2xvdWRicmVhay5zZWN1cml0eWdyb3VwcyIsImNsb3VkYnJlYWsuc3RhY2tzIiwiY2xvdWRicmVhay5jcmVkZW50aWFscyJdfQ.0akPUblypyHV2dRnhHqEYAzyOIy-lPxfH-YRaGVr8kY",
    "bp_base64": "eyJCbHVlcHJpbnRzIjp7ImJsdWVwcmludF9uYW1lIjoidGVzdCIsInN0YWNrX25hbWUiOiJIRFAiLCJzdGFja192ZXJzaW9uIjoiMy4wLjEifSwiY29uZmlndXJhdGlvbnMiOlt7ImNvcmUtc2l0ZSI6eyJwcm9wZXJ0aWVzX2F0dHJpYnV0ZXMiOnt9LCJwcm9wZXJ0aWVzIjp7ImZzLnMzYS50aHJlYWRzLm1heCI6IjEwMDAiLCJmcy5zM2EudGhyZWFkcy5jb3JlIjoiNTAwIiwiZnMuczNhLm1heC50b3RhbC50YXNrcyI6IjEwMDAiLCJmcy5zM2EuY29ubmVjdGlvbi5tYXhpbXVtIjoiMTUwMCJ9fX0seyJoZGZzLXNpdGUiOnsicHJvcGVydGllc19hdHRyaWJ1dGVzIjp7fSwicHJvcGVydGllcyI6e319fSx7Inlhcm4tc2l0ZSI6eyJwcm9wZXJ0aWVzIjp7Inlhcm4ubm9kZW1hbmFnZXIucmVzb3VyY2UuY3B1LXZjb3JlcyI6IjYiLCJ5YXJuLm5vZGVtYW5hZ2VyLnJlc291cmNlLm1lbW9yeS1tYiI6IjIzMjk2IiwieWFybi5zY2hlZHVsZXIubWF4aW11bS1hbGxvY2F0aW9uLW1iIjoiMjMyOTYifX19LHsiY2FwYWNpdHktc2NoZWR1bGVyIjp7InByb3BlcnRpZXMiOnsieWFybi5zY2hlZHVsZXIuY2FwYWNpdHkucm9vdC5xdWV1ZXMiOiJkZWZhdWx0IiwieWFybi5zY2hlZHVsZXIuY2FwYWNpdHkucm9vdC5jYXBhY2l0eSI6IjEwMCIsInlhcm4uc2NoZWR1bGVyLmNhcGFjaXR5LnJvb3QubWF4aW11bS1jYXBhY2l0eSI6IjEwMCIsInlhcm4uc2NoZWR1bGVyLmNhcGFjaXR5LnJvb3QuZGVmYXVsdC5jYXBhY2l0eSI6IjEwMCIsInlhcm4uc2NoZWR1bGVyLmNhcGFjaXR5LnJvb3QuZGVmYXVsdC5tYXhpbXVtLWNhcGFjaXR5IjoiMTAwIn19fSx7Inlhcm4tc2l0ZSI6eyJwcm9wZXJ0aWVzIjp7Inlhcm4ubm9kZW1hbmFnZXIucmVzb3VyY2UuY3B1LXZjb3JlcyI6IjYiLCJ5YXJuLm5vZGVtYW5hZ2VyLnJlc291cmNlLm1lbW9yeS1tYiI6IjIzMjk2IiwieWFybi5zY2hlZHVsZXIubWF4aW11bS1hbGxvY2F0aW9uLW1iIjoiMjMyOTYifX19LHsiY2FwYWNpdHktc2NoZWR1bGVyIjp7InByb3BlcnRpZXMiOnsieWFybi5zY2hlZHVsZXIuY2FwYWNpdHkucm9vdC5xdWV1ZXMiOiJkZWZhdWx0IiwieWFybi5zY2hlZHVsZXIuY2FwYWNpdHkucm9vdC5jYXBhY2l0eSI6IjEwMCIsInlhcm4uc2NoZWR1bGVyLmNhcGFjaXR5LnJvb3QubWF4aW11bS1jYXBhY2l0eSI6IjEwMCIsInlhcm4uc2NoZWR1bGVyLmNhcGFjaXR5LnJvb3QuZGVmYXVsdC5jYXBhY2l0eSI6IjEwMCIsInlhcm4uc2NoZWR1bGVyLmNhcGFjaXR5LnJvb3QuZGVmYXVsdC5tYXhpbXVtLWNhcGFjaXR5IjoiMTAwIn19fV0sImhvc3RfZ3JvdXBzIjpbeyJuYW1lIjoibWFzdGVyIiwiY2FyZGluYWxpdHkiOiIxIiwiY29tcG9uZW50cyI6W3sibmFtZSI6Ik5BTUVOT0RFIn0seyJuYW1lIjoiU0VDT05EQVJZX05BTUVOT0RFIn0seyJuYW1lIjoiREFUQU5PREUifSx7Im5hbWUiOiJKT1VSTkFMTk9ERSJ9LHsibmFtZSI6IkhERlNfQ0xJRU5UIn0seyJuYW1lIjoiTk9ERU1BTkFHRVIifSx7Im5hbWUiOiJSRVNPVVJDRU1BTkFHRVIifSx7Im5hbWUiOiJBUFBfVElNRUxJTkVfU0VSVkVSIn0seyJuYW1lIjoiWUFSTl9DTElFTlQifSx7Im5hbWUiOiJNRVRSSUNTX0NPTExFQ1RPUiJ9LHsibmFtZSI6Ik1FVFJJQ1NfTU9OSVRPUiJ9LHsibmFtZSI6IkhJU1RPUllTRVJWRVIifSx7Im5hbWUiOiJaT09LRUVQRVJfU0VSVkVSIn0seyJuYW1lIjoiWk9PS0VFUEVSX0NMSUVOVCJ9XX0seyJuYW1lIjoid29ya2VyIiwiY2FyZGluYWxpdHkiOiIxKyIsImNvbXBvbmVudHMiOlt7Im5hbWUiOiJEQVRBTk9ERSJ9LHsibmFtZSI6IkhERlNfQ0xJRU5UIn0seyJuYW1lIjoiTk9ERU1BTkFHRVIifSx7Im5hbWUiOiJZQVJOX0NMSUVOVCJ9LHsibmFtZSI6Ik1FVFJJQ1NfTU9OSVRPUiJ9LHsibmFtZSI6IkhJU1RPUllTRVJWRVIifSx7Im5hbWUiOiJaT09LRUVQRVJfQ0xJRU5UIn1dfSx7Im5hbWUiOiJjb21wdXRlIiwiY2FyZGluYWxpdHkiOiIxKyIsImNvbXBvbmVudHMiOlt7Im5hbWUiOiJIREZTX0NMSUVOVCJ9LHsibmFtZSI6Ik5PREVNQU5BR0VSIn0seyJuYW1lIjoiWUFSTl9DTElFTlQifSx7Im5hbWUiOiJNRVRSSUNTX01PTklUT1IifSx7Im5hbWUiOiJISVNUT1JZU0VSVkVSIn0seyJuYW1lIjoiWk9PS0VFUEVSX0NMSUVOVCJ9XX1dfQ==",
    "cluster_name": "cool-name-bro"
}*/

@Injectable({
  providedIn: 'root'
})
export class BundlePushService {
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

  public bpBody: BPBody;

  uri = this.getAbsoluteDomainUrl() + ':4000';

  getToken(content) {
    return this.http.post(`${this.uri}/get_token`,content,httpOptions).toPromise();
  }

  loadBlueprint(content) {
    return this.http.post(`${this.uri}/load_blueprint`, content, httpOptions).toPromise();
  }
}

