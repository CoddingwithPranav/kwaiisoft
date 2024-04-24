import { Component, Input,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ AsyncPipe, NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent{
  @Input() showActiveIcon: boolean = true;
  @Input() isEdit: boolean = false;
  @Input() url: string = '';
  UserStore = inject(UserStore);




 

}
