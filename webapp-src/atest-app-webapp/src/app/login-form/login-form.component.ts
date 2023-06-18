import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {AccountService} from "../services/account.service";
import {environment} from "../../environments/environment.development";

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

  constructor(public router: Router, private accountService: AccountService) {
  }

  submit(): void {
    let user: User = {
      username: this.form.get("username")?.value,
      password: this.form.get("password")?.value
    }
    if(this.form.get("username")?.value === ""){
      user.username = "john455@mail.com";
      user.password = "@F23fjjs233";
    }
    this.accountService.onLogin(user).subscribe({
      next: (res: any) => {
        if (res.role === environment.ROLE_STUDENT) {
          this.router.navigateByUrl('/dashboard');
        } else if (res.role === environment.ROLE_PROF) {
          this.router.navigateByUrl('/teacher');
        } else {
          //localStorage.removeItem('refreshToken');
          this.error = "Malformed Payload!";
        }
      },
      error: (err) => {
        this.error = err.error.error;
      }
    });
  }

  submitStudent(): void{
    let user: User = {
      username: this.form.get("username")?.value,
      password: this.form.get("password")?.value
    }
    if(this.form.get("username")?.value === ""){
      user.username = "john555@mail.com";
      user.password = "@F23fjjs233";
    }
    this.accountService.onLogin(user).subscribe({
      next: (res: any) => {
        if (res.role === environment.ROLE_STUDENT) {
          this.router.navigateByUrl('/dashboard');
        } else if (res.role === environment.ROLE_PROF) {
          this.router.navigateByUrl('/teacher');
        } else {
          //localStorage.removeItem('refreshToken');
          this.error = "Malformed Payload!";
        }
      },
      error: (err) => {
        this.error = err.error.error;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
