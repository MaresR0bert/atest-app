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

  getTests(token:string): Observable<any> {
    const options = {
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.get(environment.GET_TESTS_ENDPOINT, options);
  }

  changeTestStatus(testId: string, token: string): Observable<any> {
    const options = {
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.get(environment.CHANGE_TEST_STATUS_ENDPOINT + testId, options);
  }

  startTest(roomCode: string, token: string): Observable<any> {
    const options = {
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.get(environment.START_TEST_ENDPOINT + roomCode, options);
  }

  verifyAndGetNextQuestion(answers: string[], questionId: string, token: string, isFinished: boolean): Observable<any> {
    const options = {
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    return this.http.post(environment.VERIFY_ENDPOINT + questionId, {answers: answers, isFinished: isFinished}, options)
  }
}
