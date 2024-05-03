import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-theme-mode',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './theme-mode.component.html',
  styleUrl: './theme-mode.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThemeModeComponent {
  

  themeService = inject(ThemeService);

 
}
