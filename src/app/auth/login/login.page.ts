// login.page.ts

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,

  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginPage implements OnInit {

  // Reactive Form
  loginForm!: FormGroup;

  // Toggle show password
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    // Initialize form validation
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });

  }

  // Mockup login function
  onLogin() {

    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);

      // TODO:
      // Integrasikan ke API Laravel nanti
    }

  }

  // Mockup Google OAuth
  onGoogleLogin() {
    console.log('Google Login Clicked');

    // TODO:
    // Integrasi Google OAuth nanti
  }

  // Toggle password visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}