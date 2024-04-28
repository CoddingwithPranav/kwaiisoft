import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-notice-pannel',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './notice-pannel.component.html',
  styleUrl: './notice-pannel.component.scss'
})
export class NoticePannelComponent {
userStore = inject(UserStore)
}
