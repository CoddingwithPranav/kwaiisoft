import { Component, inject } from '@angular/core';
import { AbstractControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {
  authService = inject(AuthService);
  toast = inject(HotToastService);
  router = inject(Router);
  fb = inject(NonNullableFormBuilder);


  signUpForm = this.fb.group(
    {
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    },
  );

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get displayName() {
    return this.signUpForm.get('displayName');
  }

  submit() {
    const { displayName, email, password } = this.signUpForm.value;
    if (!this.signUpForm.valid || !displayName || !password || !email) {
      return;
    }

    this.authService
      .register(email, password).subscribe((res) => {
        this.authService.addUser(res, this.signUpForm.value);
      });
  }


 signWithGoogle(){
  this.authService.signWithGoogle();
 }

}
