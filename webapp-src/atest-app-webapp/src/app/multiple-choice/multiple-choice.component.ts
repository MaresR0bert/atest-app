import {Component, Input, OnInit} from '@angular/core';
import {TestService} from "../services/test.service";
import {AccountService} from "../services/account.service";
import {switchMap} from "rxjs";
import Utils from "../Utils/utils";
import {FormControl, FormGroup} from "@angular/forms";

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

  constructor(private accountService: AccountService, private testService: TestService) { }

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
    if(this.question.isMultiple){
      console.log(this.multipleAnswers);
    } else {
      console.log([this.form.get('answer')?.value]);
    }
    this.question = {
      "questionBody":"<p>spiderman</p>",
      "answers":["bat","man"],
      "isMultiple": false
    }
  }
}
