import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {switchMap} from "rxjs";
import {QuestionService} from "../services/question.service";
import {Router} from "@angular/router";
import Utils from "../Utils/utils";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-test-creation',
  templateUrl: './test-creation.component.html',
  styleUrls: ['./test-creation.component.css']
})
export class TestCreationComponent implements OnInit{

  localToken: string = '';
  questionList: any[] = [];
  selectedQuestionsList: any[] = [];
  error: string | null;
  form: FormGroup = new FormGroup({
    testCode: new FormControl('')
  });

  constructor(private accountService: AccountService, private questionService: QuestionService, private router: Router) {
  }

  displayQuillConfig={
    syntax: true,
    toolbar: false
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
        this.questionList.sort(Utils.compareQuestionsByCreateDate);
      });
    }), (err: any) => {
      this.router.navigateByUrl("/404");
    }
  }

  submit(){
    alert(this.form.get('testCode')?.value);
  }

  move = (id: string) => {
    this.selectedQuestionsList.push(this.questionList.filter((question: any) => question._id === id)[0]);
    this.questionList = this.questionList.filter((question: any) => question._id !== id);
  }

  moveAll = () => {
    this.questionList.forEach((question: any) => {
      this.selectedQuestionsList.push(question);
    })
    this.questionList = [];
  }

  remove = (id: string) => {
    this.questionList.push(
      this.selectedQuestionsList.filter((selectedQuestion: any) => selectedQuestion._id === id)[0]
    );
    this.selectedQuestionsList = this.selectedQuestionsList.filter((selectedQuestion: any) =>
      selectedQuestion._id !== id
    );
    this.questionList.sort(Utils.compareQuestionsByCreateDate);
  }

  removeAll = () => {
    this.selectedQuestionsList.forEach((selectedQuestion: any) => {
      this.questionList.push(selectedQuestion);
    });
    this.questionList.sort(Utils.compareQuestionsByCreateDate);
    this.selectedQuestionsList = [];
  }
}
