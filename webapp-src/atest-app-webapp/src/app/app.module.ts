import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import {NavbarComponent} from "./navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TeacherNavbarComponent } from './teacher-navbar/teacher-navbar.component';
import { QuestionCrudComponent } from './question-crud/question-crud.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {QuillEditorComponent, QuillModule} from "ngx-quill";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    DashboardComponent,
    NavbarComponent,
    TeacherDashboardComponent,
    TeacherNavbarComponent,
    QuestionCrudComponent,
    QuestionListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgOptimizedImage,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    QuillEditorComponent,
    FormsModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
