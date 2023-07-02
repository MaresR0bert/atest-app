import {Component, Input, OnInit} from '@angular/core';
import {TestService} from "../services/test.service";
import {AccountService} from "../services/account.service";
import {switchMap} from "rxjs";
import Utils from "../Utils/utils";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit{
  @Input() roomCode: string;
  localToken: string;
  question: any;
  form: FormGroup = new FormGroup({
    answer: new FormControl('')
  });
  multipleAnswers: string[] = [];

  constructor(private router:Router, private accountService: AccountService, private testService: TestService) { }

  ngOnInit() {
    this.accountService.onRefreshAccessToken().pipe(
      switchMap((token: any) => {
        this.localToken = token.accessToken;
        return this.testService.startTest(this.roomCode, this.localToken);
      })
    ).subscribe((encryptedQuestion: any) => {
      this.question = Utils.decryptQuestion(encryptedQuestion);
    })
  }

  displayQuillConfig={
    syntax: true,
    toolbar: false
  }

  checkCheckBoxvalue(event: any){
    if (!this.multipleAnswers.includes(event.target.value)){
      this.multipleAnswers.push(event.target.value);
    } else {
      this.multipleAnswers = this.multipleAnswers.filter((answer: string) => answer !== event.target.value);
    }
  }

  submit(){
    const answer: string[] = this.question.isMultiple ? this.multipleAnswers : [this.form.get('answer')?.value];
    this.testService.verifyAndGetNextQuestion(answer, this.question._id, this.localToken, false)
      .subscribe((newQuestion: any) => {
        console.log(newQuestion);
        //this.question = Utils.decryptQuestion(newQuestion);
      });
  }

  finishAttempt() {
    const answer: string[] = this.question.isMultiple ? this.multipleAnswers : [this.form.get('answer')?.value];
    this.testService.verifyAndGetNextQuestion(answer, this.question._id, this.localToken, true)
      .subscribe((body: any) => {
        this.router.navigateByUrl('/dashboard');
      });
  }
}
