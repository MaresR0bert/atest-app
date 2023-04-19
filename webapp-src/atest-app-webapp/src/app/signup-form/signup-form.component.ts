import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

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

  constructor(public router: Router) {
  }

  submit(): void {

    if(this.form.get("password")?.value !== this.form.get("confirmedPassword")?.value) {
      this.error = "Passwords do not match!"
      return;
    }

    const user: User = {
      username: this.form.get("username")?.value,
      password: this.form.get("password")?.value
    }

    console.log(JSON.stringify(user));
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmedPasswordVisibility(): void {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }
}
