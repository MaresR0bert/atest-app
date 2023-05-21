import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountService);
  return authService.onAuthCheck();
};
