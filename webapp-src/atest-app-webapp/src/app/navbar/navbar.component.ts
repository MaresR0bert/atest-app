import { Component } from '@angular/core';
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
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
}
