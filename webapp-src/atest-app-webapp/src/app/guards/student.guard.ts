import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {catchError, Observable, of, tap} from "rxjs";

export const studentGuard: CanActivateFn = (route, state): boolean | Observable<boolean> => {
  const authService = inject(AccountService);
  const router = inject(Router);
  return authService.onTeacherCheck().pipe(
    tap(data => {
      router.navigateByUrl("/teacher");
      return !data;
    }),
    catchError((err, caught) => {
      return of(true);
    })
  )
};
