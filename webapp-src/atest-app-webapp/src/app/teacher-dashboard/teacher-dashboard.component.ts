import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {switchMap} from "rxjs";
import {TestService} from "../services/test.service";

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit{

  localToken: string;
  tests: any[] = [];

  constructor(private accountService: AccountService, private testService: TestService) {

  }

  ngOnInit(): void {
    this.accountService.onRefreshAccessToken().pipe(
      switchMap((token: any) => {
        this.localToken = token.accessToken;
        return this.testService.getTests(this.localToken);
      })
    ).subscribe((tests: any) => {
      this.tests = tests;
    });
  }

  changeTestStatus(testId: string){
    this.testService.changeTestStatus(testId, this.localToken).subscribe(() => {
      window.location.reload();
    });
  }

}
