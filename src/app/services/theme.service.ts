import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  toggleDarkMode() {
    this.isDarkMode.next(!this.isDarkMode.getValue());
  }
}