import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavigationComponent } from '../../shared/side-navigation/side-navigation.component';
import { NgOptimizedImage } from '@angular/common';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, SideNavigationComponent, NgOptimizedImage],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
