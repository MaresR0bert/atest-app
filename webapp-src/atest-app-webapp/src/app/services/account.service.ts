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

  options = {
    withCredentials: true
  }
  constructor(private http: HttpClient) { }

  onLogin(user: User): Observable<any> {
    return this.http.post(environment.LOGIN_ENDPOINT, user, this.options);
  }

  onSignup(userSignup: UserSignup): Observable<any> {
    return this.http.post(environment.SIGNUP_ENDPOINT, userSignup, this.options);
  }

  onLogout(): Observable<any> | null {
    return this.http.post(environment.LOGOUT_ENDPOINT, {}, this.options);
  }
}
