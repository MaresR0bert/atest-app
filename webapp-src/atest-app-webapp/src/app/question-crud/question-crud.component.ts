import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AccountService} from "../services/account.service";
import {Question} from "../../models/question.model";
import {QuestionService} from "../services/question.service";
import {Router} from "@angular/router";
import * as CryptoJS from 'crypto-js';
import {environment} from "../../environments/environment.development";

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

  ngOnInit() {
    this.accountService.onRefreshAccessToken().subscribe({
      next: (res: any) => {
        this.localToken = res.accessToken;
        this.questionService.getQuestions(this.localToken).subscribe({
          next: (res: any) => {
            res.forEach((elem: any) => this.questionList.push(elem));
          },
          error: (err) => {
            this.router.navigateByUrl("/404");
          }
        });
      },
      error: (err) => {
        this.router.navigateByUrl("/404");
      }
    })
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
      const encryptedQuestion = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(currentQuestion),
        environment.AES_ENCRYPTION_KEY).toString());

      this.questionService.addQuestion(encryptedQuestion, this.localToken).subscribe({
        next: () => {
          this.matSnackBar.open("Question added successfully", "OK", {
            duration:3000
          });
          this.questionService.getQuestions(this.localToken).subscribe({
            next: (res: any) => {
              this.questionList = [];
              res.forEach((elem: any) => this.questionList.push(elem));
            },
            error: (err) => {
              this.router.navigateByUrl("/404");
            }
          });
        },
        error: () => {
          const matSnackBarREF = this.matSnackBar.open("ERROR: Question creation failed, Session Expired", "REFRESH");
          matSnackBarREF.afterDismissed().subscribe({
            next: () => {
              window.location.reload();
            }
          });
        }
      });
    }
  }
}
