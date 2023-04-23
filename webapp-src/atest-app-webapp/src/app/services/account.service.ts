import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {UserSignup} from "../../models/user.signup.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  onLogin(user: User): Observable<any>{
    return this.http.post(environment.LOGIN_ENDPOINT, user);
  }

  onSignup(userSingup: UserSignup): Observable<any>{
    return this.http.post(environment.SIGNUP_ENDPOINT, userSingup);
  }
}
