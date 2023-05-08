import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import {SignupFormComponent} from "./signup-form/signup-form.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TeacherDashboardComponent} from "./teacher-dashboard/teacher-dashboard.component";
import {QuestionCrudComponent} from "./question-crud/question-crud.component";
import {QuestionListComponent} from "./question-list/question-list.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: LoginFormComponent, pathMatch: 'full'},
  {path: 'signup', component: SignupFormComponent, pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
  {path: 'teacher', component: TeacherDashboardComponent, pathMatch: 'full'},
  {path: "question/create", component: QuestionCrudComponent, pathMatch: 'full'},
  {path: "question/list", component: QuestionListComponent, pathMatch: 'full'},
  {path: "404", component: PageNotFoundComponent, pathMatch: 'full'},
  {path: "**", redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
