import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { IndexComponent } from './index/index.component';


export const routes: Routes = [

    { path:  'signup', component:  SignupComponent},
    { path:  'login', component:  LoginComponent},
    { path:  'todo/:id', component:  TodoComponent},
    { path:  '', component:  IndexComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
