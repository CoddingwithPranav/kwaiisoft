import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { BootomNavigationComponent } from '../../../shared/bootom-navigation/bootom-navigation.component';
import { ProductService } from '../../../services/product.service';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common'
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product';
import { ProductStore } from '../../../store/product.store';
import { CartStore } from '../../../store/cart.store';
import { UserStore } from '../../../store/user.store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { wishListStore } from '../../../store/wishlist.store';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports : [ NgIf ,AsyncPipe,CardComponent, ProgressSpinnerModule,RouterModule, BootomNavigationComponent,NgOptimizedImage, AutoCompleteModule , FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  productStore = inject(ProductStore);
  cartStore = inject(CartStore)
  UserStore = inject(UserStore)
  wishlistStore = inject(wishListStore)


constructor(){
  this.productStore.loadProducts('');
}

  items!: any[] ;

    selectedItem: any;

    suggestions!: any[] ;


    search(event: AutoCompleteCompleteEvent) {
      this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }
  ngOnInit(){
 
  }
  addToCart(product:Product){
   const updatedProduct:Product = {...product};

   const {id:productId} = updatedProduct;

    this.cartStore.addCartProducts({productId, product:updatedProduct})
  }

  addToWishList(product:Product){
    const updatedProduct:Product = {...product};

    const {id:productId} = updatedProduct;
 
     this.wishlistStore.addWishListProducts({productId, product:updatedProduct})
  }
}
