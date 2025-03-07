import { Component,  inject } from '@angular/core';
import { BootomNavigationComponent } from '../../../shared/bootom-navigation/bootom-navigation.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductStore } from '../../../store/product.store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [BootomNavigationComponent, RouterLink, ProgressSpinnerModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent  {
  id!:string ;
  productStore = inject(ProductStore)

  constructor(private route:ActivatedRoute) {
    this.route.params.subscribe((res:any)=>{
      this.id = res.id
  })
    this.productStore.loadOneProducts(this.id);
  }
  calculateDiscountPercentage(
    originalPrice: number,
    discountAmount: number
  ): string {
    if (
      !originalPrice ||
      !discountAmount ||
      discountAmount < 0 ||
      discountAmount > originalPrice
    ) {
      return '0'; // Return 0% if invalid values
    }

    const percentage = (discountAmount / originalPrice) * 100;
    return percentage.toFixed(2); // Returns percentage with 2 decimal places
  }

}
