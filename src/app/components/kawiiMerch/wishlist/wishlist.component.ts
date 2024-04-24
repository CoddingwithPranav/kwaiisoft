import { Component, inject } from '@angular/core';
import { BootomNavigationComponent } from '../../../shared/bootom-navigation/bootom-navigation.component';
import { CardComponent } from '../card/card.component';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { wishListStore } from '../../../store/wishlist.store';
@Component({
  selector: 'app-wishlist',
  standalone:true,
  imports:[BootomNavigationComponent, CardComponent, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlistStore = inject(wishListStore)
  
  constructor(){
   this.wishlistStore.loadWishlistProducts('')
  }




 
    removeWishlist(product:Product){
      const updatedProduct:Product = {...product};
  
      const {id:productId} = updatedProduct
  
      this.wishlistStore.RemovewishlistProducts({productId, product:updatedProduct})
   }
  
}
