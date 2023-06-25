import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  addTest(testInfo: any, token: string): Observable<any> {
    const options = {
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.post(environment.ADD_TEST_ENDPOINT, testInfo, options);
  }
}
