import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {AccountService} from "../services/account.service";

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
    const user: User = {
      username: this.form.get("username")?.value,
      password: this.form.get("password")?.value
    }
    console.log(JSON.stringify(user));
    this.accountService.onLogin(user).subscribe((res: any) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      console.log(res);
      this.router.navigateByUrl('/dashboard');
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
