import { Component } from '@angular/core';
import { BootomNavigationComponent } from '../../../shared/bootom-navigation/bootom-navigation.component';

@Component({
  selector: 'app-payment',
  standalone:true,
  imports:[BootomNavigationComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

}
