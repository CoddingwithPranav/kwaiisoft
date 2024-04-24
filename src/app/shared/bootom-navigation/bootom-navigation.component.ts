import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bootom-navigation',
  standalone: true,
  imports: [ProfileComponent, RouterLink, RouterLinkActive],
  templateUrl: './bootom-navigation.component.html',
  styleUrl: './bootom-navigation.component.scss'
})
export class BootomNavigationComponent {

}
