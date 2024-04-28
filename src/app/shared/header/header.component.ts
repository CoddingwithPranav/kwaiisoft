import { Component, OnInit, inject } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
authService = inject(AuthService);
UserStore = inject(UserStore)
showUser(){
  this.authService.SendVerificationMail();
}
}
