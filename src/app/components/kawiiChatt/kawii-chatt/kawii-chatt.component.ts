import { Component, } from '@angular/core';
import { BootomNavigationComponent } from '../../../shared/bootom-navigation/bootom-navigation.component';
import { ChartAreaComponent } from '../chart-area/chart-area.component';
import { FriendListComponent } from '../friend-list/friend-list.component';
import { OtherAccountComponent } from '../other-account/other-account.component';
@Component({
  selector: 'app-kawii-chatt',
  standalone: true,
  imports: [
    BootomNavigationComponent,
    FriendListComponent,
    ChartAreaComponent,
    OtherAccountComponent
  ],

  templateUrl: './kawii-chatt.component.html',
  styleUrl: './kawii-chatt.component.scss',

})
export class KawiiChattComponent {

}
