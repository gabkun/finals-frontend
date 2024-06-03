import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    lname: new FormControl('', Validators.required),
    fname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  message = '';

  async signup() {
    if (this.signupForm.invalid) {
      this.message = 'Please fill out the form correctly.';
      return;
    }

    const { lname, fname, username, email, password } = this.signupForm.value;
    console.log(lname, fname, username, email, password);

    try {
      const response = await axios.post('https://finalexam-p1tj.onrender.com/signup', { lname, fname, username, email, password });
      this.signupForm.reset();
      this.message = 'Signup successful!';
      console.log(response);
    } catch (error) {
      this.message = 'Error: ';
      console.log('Error', error);
    }
  }
}