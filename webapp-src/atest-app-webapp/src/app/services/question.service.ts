import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "../../models/question.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  addQuestion(question: Question, token: string): Observable<any> {
    const options = {
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    return this.http.post(environment.ADD_QUESTION_ENDPOINT, question, options);
  }
}
