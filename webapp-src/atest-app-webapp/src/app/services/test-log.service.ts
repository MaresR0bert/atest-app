import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class TestLogService {

  constructor(private http: HttpClient) { }

  getTestLogs(token: string): Observable<any> {
    const options = {
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.get(environment.GET_TEST_LOGS_ENDPOINT, options);
  }
}
