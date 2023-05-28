import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-question-crud',
  templateUrl: './question-crud.component.html',
  styleUrls: ['./question-crud.component.css']
})
export class QuestionCrudComponent implements OnInit{
  content: string
  questionList: any[] = []
  form: FormGroup = new FormGroup({
    questionBody: new FormControl(''),
    rightAnswers: new FormControl(''),
    wrongAnswers: new FormControl(''),
    difficulty: new FormControl(1)
  });

  constructor(private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
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
      this.matSnackBar.open("Question added successfully", "OK", {
        duration:3000
      });
      this.questionList.push({
        questionBody: this.form.get("questionBody")?.value,
        rightAnswers: this.form.get("rightAnswers")?.value.split("\n"),
        wrongAnswers: this.form.get("wrongAnswers")?.value.split("\n"),
        difficulty: this.form.get("difficulty")?.value
      })
    }
  }
}
