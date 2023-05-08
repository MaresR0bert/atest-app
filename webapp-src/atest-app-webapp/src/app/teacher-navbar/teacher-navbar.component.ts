import { Component } from '@angular/core';
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teacher-navbar',
  templateUrl: './teacher-navbar.component.html',
  styleUrls: ['./teacher-navbar.component.css']
})
export class TeacherNavbarComponent {
  constructor(private accountService: AccountService, private router: Router) {
  }

  onLogout(): void {
    this.accountService.onLogout()?.subscribe((res: any) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.router.navigateByUrl('/login');
      console.log(res);
    });
  }

  createButtonHandler(): void {
    this.router.navigateByUrl('/question/create');
  }
}
