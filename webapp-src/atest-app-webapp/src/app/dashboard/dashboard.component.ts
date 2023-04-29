import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  error: string | null;
  form: FormGroup = new FormGroup({
    testCode: new FormControl('')
  });

  submit(){
    this.error = "SO BAAAAD";
  }
}
