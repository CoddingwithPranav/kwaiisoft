import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../services/auth.service';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, ReactiveFormsModule  , NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  toast = inject(HotToastService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(){
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    this.authService
    .login( email, password)
    .subscribe((res) => {
      console.log(res)
      localStorage.setItem('token', JSON.stringify(res.user.uid));
      this.authService.loggedInUser = res.user;
      
    },
    err=>{
      // this.toast.error(err);
    });
}

 signWithGoogle(){
  this.authService.signWithGoogle();
 }

}
