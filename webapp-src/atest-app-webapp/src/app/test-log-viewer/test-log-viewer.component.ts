import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {TestLogService} from "../services/test-log.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-test-log-viewer',
  templateUrl: './test-log-viewer.component.html',
  styleUrls: ['./test-log-viewer.component.css']
})
export class TestLogViewerComponent implements OnInit{

  tests: any[] = [];
  localToken: string;

  constructor(private accountService: AccountService, private testLogSerivce: TestLogService) {
  }

  ngOnInit(): void {
    this.accountService.onRefreshAccessToken().pipe(
      switchMap((token: any) => {
        this.localToken = token.accessToken;
        return this.testLogSerivce.getTestLogs(this.localToken);
      })
    ).subscribe((testLogs: any) => {
      this.tests = testLogs;
    });
  }
}
