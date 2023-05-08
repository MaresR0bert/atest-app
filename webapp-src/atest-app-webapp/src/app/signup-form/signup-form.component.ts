import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserSignup} from "../../models/user.signup.model";
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  showPassword: boolean = false;
  showConfirmedPassword: boolean = false;
  error: string | null;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmedPassword: new FormControl('')
  });

  constructor(public router: Router, private accountService: AccountService) {
  }

  submit(): void {

    if(this.form.get("password")?.value !== this.form.get("confirmedPassword")?.value) {
      this.error = "Passwords do not match!"
      return;
    }

    const userSignup: UserSignup = {
      username: this.form.get("username")?.value,
      password: this.form.get("password")?.value,
      role: "ROLE_STUDENT"
    }

    this.accountService.onSignup(userSignup).subscribe((res: any) => {
      //localStorage.setItem('refreshToken', res.refreshToken);
      console.log(res);
      this.router.navigateByUrl('/dashboard');
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmedPasswordVisibility(): void {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }
}
