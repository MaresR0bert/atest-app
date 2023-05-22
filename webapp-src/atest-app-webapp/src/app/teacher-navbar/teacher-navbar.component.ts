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
    this.accountService.onLogout()?.subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.router.navigateByUrl('/login');
      }
    });
  }

  createButtonHandler(): void {
    this.router.navigateByUrl('/question/create');
  }
}
