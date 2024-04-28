import { Component, inject } from '@angular/core';
import { BootomNavigationComponent } from '../../../shared/bootom-navigation/bootom-navigation.component';
import { CardComponent } from '../card/card.component';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { wishListStore } from '../../../store/wishlist.store';
import { HotToastService } from '@ngneat/hot-toast';
import { CartStore } from '../../../store/cart.store';
@Component({
  selector: 'app-wishlist',
  standalone:true,
  imports:[BootomNavigationComponent, CardComponent, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlistStore = inject(wishListStore)
  cartStore = inject(CartStore)
  toastService = inject(HotToastService)
  constructor(){
   this.wishlistStore.loadWishlistProducts('');
  }


  addToCart(product:Product){
    // if(product.Incart){
    //     this.toastService.warning("Already Added To Cart")
    // }else{
    //  const updatedProduct:Product = {...product};
 
    // const {id:productId} = updatedProduct;
    // updatedProduct.Incart = true;
 
    //  this.cartStore.addCartProducts({productId, product:updatedProduct})


    // }
   }

 
    removeWishlist(product:Product){
      const updatedProduct:Product = {...product};
  
      const {id:productId} = updatedProduct
  
      this.wishlistStore.RemovewishlistProducts({productId, product:updatedProduct})
   }
  
}
