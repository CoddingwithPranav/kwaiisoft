import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  authService = inject(AuthService);

  email:string='';
  forgetPassword(){
    this.authService.forgetPassword(this.email);

  }
}
