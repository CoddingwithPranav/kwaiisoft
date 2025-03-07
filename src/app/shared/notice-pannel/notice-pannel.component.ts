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
  currentDate = new Date();
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  likes = 32190;
  stars = 32190;
  plays = 32190;

  incrementLikes() {
    this.likes++;
  }

  incrementStars() {
    this.stars++;
  }

  incrementPlays() {
    this.plays++;
  }

  getFormattedDay(): string {
    return this.currentDate.getDate().toString().padStart(2, '0');
  }

  getMonthName(): string {
    return this.monthNames[this.currentDate.getMonth()];
  }
}
