import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-question-crud',
  templateUrl: './question-crud.component.html',
  styleUrls: ['./question-crud.component.css']
})
export class QuestionCrudComponent {
  content: string
  form: FormGroup = new FormGroup({
    questionBody: new FormControl('')
  });

  quillConfig={
    syntax: true,
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],

        ['link'],
        ['image']
        //['link', 'image', 'video']
      ],

    },
    "emoji-toolbar": false,
    "emoji-textarea": true,
    "emoji-shortname": true,
  }

  submit():void {

  }
}
