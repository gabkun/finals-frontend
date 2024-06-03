import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  message = '';
  constructor(private router: Router) {}

async signin() {
    if (this.loginForm.invalid) {
        this.message = 'Please fill out the form correctly.';
        return;
    }

    const { username, password } = this.loginForm.value;
    console.log(username, password);

    try {
        const response = await axios.post('https://finalexam-p1tj.onrender.com/login', { username, password });
        this.message = 'Login successful!';
        this.router.navigate([`/todo/${response.data.id}`]);
        console.log('Response:', response);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 401) {
                    this.message = 'Invalid username or password.';
                } else {
                    this.message = 'Server error: ' + error.response.data.error;
                }
            } else {
                this.message = 'No response from server. Please try again later.';
            }
        } else {
            this.message = 'An unexpected error occurred.';
        }
        console.log('Error', error);
    }
}
}
