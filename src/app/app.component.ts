import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavComponent } from './nav/nav.component';
import { IndexComponent } from './index/index.component';

@Component({ 
  selector: 'app-root', 
  standalone: true, 
  imports: [RouterOutlet, TodoComponent, LoginComponent, SignupComponent, NavComponent, IndexComponent], 
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'})
export class AppComponent { title = 'angular-test';
}