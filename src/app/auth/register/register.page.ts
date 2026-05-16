// register.page.ts

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class RegisterPage implements OnInit {

  // Reactive Form Group khusus Register
  registerForm!: FormGroup;

  // Toggle mata password
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Inisialisasi validasi form register TokoGenZ
    this.registerForm = this.fb.group({
      namaToko: [
        '',
        [
          Validators.required
        ]
      ],
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
      ],
      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ]
    }, { 
      // Custom validator untuk mencocokkan password & konfirmasi password
      validators: this.passwordMatchValidator 
    });
  }

  // Custom Validator fungsi pencocokan password
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatch: true };
    }
    return null;
  }

  // Fungsi saat tombol daftar ditekan
  onRegister() {
    if (this.registerForm.valid) {
      console.log('Register Data TokoGenZ:', this.registerForm.value);

      // TODO:
      // Integrasikan ke API Laravel lo nanti di sini bro
    }
  }

  // Mockup Google OAuth Register
  onGoogleRegister() {
    console.log('Google Register Clicked');

    // TODO:
    // Integrasi Google OAuth pendaftaran nanti
  }

  // Toggle sembunyikan/tampilkan password utama
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Toggle sembunyikan/tampilkan konfirmasi password
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}