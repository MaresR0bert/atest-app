import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  onLogin(user: User): Observable<any>{
    return this.http.post(environment.LOGIN_ENDPOINT, user);
  }
}
