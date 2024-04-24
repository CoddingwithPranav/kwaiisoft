import { Component, inject} from '@angular/core';
import { BootomNavigationComponent } from '../../../shared/bootom-navigation/bootom-navigation.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NoticePannelComponent } from '../../../shared/notice-pannel/notice-pannel.component';
import { RewritetextComponent } from '../../../shared/rewritetext/rewritetext.component';
import { CartStore } from '../../../store/cart.store';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [HeaderComponent, NoticePannelComponent, BootomNavigationComponent, RewritetextComponent],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeViewComponent {
  
  
}
