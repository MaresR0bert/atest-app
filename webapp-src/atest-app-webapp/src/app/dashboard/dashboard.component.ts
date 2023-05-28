import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
  }

  submit(){
    this.router.navigateByUrl('/exam/'+this.form.get('testCode')?.value)
  }
}
