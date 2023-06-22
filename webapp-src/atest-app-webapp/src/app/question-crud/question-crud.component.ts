import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AccountService} from "../services/account.service";
import {Question} from "../../models/question.model";
import {QuestionService} from "../services/question.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs";
import Utils from "../Utils/utils";

@Component({
  selector: 'app-question-crud',
  templateUrl: './question-crud.component.html',
  styleUrls: ['./question-crud.component.css']
})
export class QuestionCrudComponent implements OnInit{
  content: string;
  questionList: Question[] = [];
  localToken: string;
  form: FormGroup = new FormGroup({
    questionBody: new FormControl(''),
    rightAnswers: new FormControl(''),
    wrongAnswers: new FormControl(''),
    difficulty: new FormControl(1)
  });

  constructor(private matSnackBar: MatSnackBar,
              private accountService: AccountService,
              private questionService: QuestionService,
              private router: Router) {
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

  quillConfig={
    syntax: true,
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['image']
      ],
    }
  }

  displayQuillConfig={
    syntax: true,
    toolbar: false
  }

  submit():void {
    if(this.form.get("rightAnswers")?.errors
      || this.form.get("wrongAnswers")?.errors
      || this.form.get("questionBody")?.errors) {
      this.matSnackBar.open("Error Creating Question!\n Please make sure all fields are completed properly", "OK", {
        duration:3000
      });
      return;
    } else {
      const currentQuestion: Question = {
        questionBody: this.form.get("questionBody")?.value,
        rightAnswers: this.form.get("rightAnswers")?.value.split("\n"),
        wrongAnswers: this.form.get("wrongAnswers")?.value.split("\n"),
        difficulty: this.form.get("difficulty")?.value
      }
      const encryptedQuestion: string = Utils.encryptQuestion(currentQuestion);

      this.questionService.addQuestion(encryptedQuestion, this.localToken).pipe(
        switchMap(() => {
          this.matSnackBar.open("Question added successfully", "OK", {
            duration:3000
          });
          return this.questionService.getQuestions(this.localToken);
        })
      ).subscribe((encryptedQuestions: any) => {
        this.questionList = [];
        encryptedQuestions.forEach((encryptedQuestion: any) => {
          this.questionList.push(Utils.decryptQuestion(encryptedQuestion));
        })
      }), (err: any) => {
        const matSnackBarREF = this.matSnackBar.open("ERROR: Question creation failed, Session Expired", "REFRESH");
        matSnackBarREF.afterDismissed().subscribe({
          next: () => {
            window.location.reload();
          }
        });
      }
    }
  }
}
