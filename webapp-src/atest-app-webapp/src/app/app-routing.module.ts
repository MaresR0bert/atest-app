import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import {SignupFormComponent} from "./signup-form/signup-form.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TeacherDashboardComponent} from "./teacher-dashboard/teacher-dashboard.component";
import {QuestionCrudComponent} from "./question-crud/question-crud.component";
import {QuestionListComponent} from "./question-list/question-list.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {authGuard} from "./guards/auth.guard";
import {loginGuard} from "./guards/login.guard";
import {teacherGuard} from "./guards/teacher.guard";
import {studentGuard} from "./guards/student.guard";

const routes: Routes = [
  {path: '', redirectTo: 'teacher', pathMatch:'full'},
  {path: 'login', component: LoginFormComponent, pathMatch: 'full', canActivate: [loginGuard]},
  {path: 'signup', component: SignupFormComponent, pathMatch: 'full', canActivate: [loginGuard]},
  {path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [authGuard, studentGuard]},
  {path: 'teacher', component: TeacherDashboardComponent, pathMatch: 'full', canActivate: [authGuard, teacherGuard]},
  {path: "question/create", component: QuestionCrudComponent, pathMatch: 'full', canActivate: [authGuard, teacherGuard]},
  {path: "question/list", component: QuestionListComponent, pathMatch: 'full', canActivate: [authGuard, teacherGuard]},
  {path: "404", component: PageNotFoundComponent, pathMatch: 'full'},
  {path: "**", redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
