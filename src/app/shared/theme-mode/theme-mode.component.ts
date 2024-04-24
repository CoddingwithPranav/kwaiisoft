import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-mode',
  standalone: true,
  imports: [],
  templateUrl: './theme-mode.component.html',
  styleUrl: './theme-mode.component.scss'
})
export class ThemeModeComponent {
  isDarkMode = false;

  constructor(private darkModeService: ThemeService) {}

  ngOnInit() {
    if (typeof document !== 'undefined') {
    this.darkModeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
      document.body.classList.toggle('dark', isDark); // Toggle dark class on body
    });
  }
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
