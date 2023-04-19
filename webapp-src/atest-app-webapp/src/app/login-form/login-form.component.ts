import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  showPassword: boolean = false;
  error: string | null;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public router: Router) {
  }

  submit(): void {
    const user: User = {
      username: this.form.get("username")?.value,
      password: this.form.get("password")?.value
    }
    console.log(JSON.stringify(user));
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
