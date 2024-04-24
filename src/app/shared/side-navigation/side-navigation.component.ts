import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeartComponent } from '../heart/heart.component';
import { AsyncPipe } from '@angular/common';
import { wishListStore } from '../../store/wishlist.store';
@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [ProfileComponent, RouterLink, RouterLinkActive, HeartComponent, AsyncPipe],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
 wishlistStore = inject(wishListStore)

}
