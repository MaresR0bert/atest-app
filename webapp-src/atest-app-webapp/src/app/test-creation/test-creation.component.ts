import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {switchMap} from "rxjs";
import {QuestionService} from "../services/question.service";
import {Router} from "@angular/router";
import Utils from "../Utils/utils";

@Component({
  selector: 'app-test-creation',
  templateUrl: './test-creation.component.html',
  styleUrls: ['./test-creation.component.css']
})
export class TestCreationComponent implements OnInit{

  localToken: string = '';
  questionList: any[] = [];

  constructor(private accountService: AccountService, private questionService: QuestionService, private router: Router) {
  }

  ngOnInit(): void {
    this.accountService.onRefreshAccessToken().pipe(
      switchMap((token: any) => {
        this.localToken = token.accessToken;
        return this.questionService.getQuestions(this.localToken);
      })
    ).subscribe((encryptedQuestions: any) => {
      encryptedQuestions.forEach((encryptedQuestion: any) => {
        this.questionList.push(Utils.decryptQuestion(encryptedQuestion));
      });
    }), (err: any) => {
      this.router.navigateByUrl("/404");
    }
  }
}
