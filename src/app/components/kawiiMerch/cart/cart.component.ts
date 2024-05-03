import { Component, OnInit, inject } from '@angular/core';
import { BootomNavigationComponent } from '../../../shared/bootom-navigation/bootom-navigation.component';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { CartStore } from '../../../store/cart.store';
import { wishListStore } from '../../../store/wishlist.store';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[BootomNavigationComponent,RouterModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
cartitem$!:Observable<Product[]>;
wishlistStore = inject(wishListStore)
totalPrice$!:Observable<number>;
 cartStore = inject(CartStore);
  ngOnInit(): void {
   if(typeof document != 'undefined'){
      this.cartStore.loadCartProducts('')
   }
  }

 remove(product:Product){
    const updatedProduct:Product = {...product};

    const {id:productId} = updatedProduct

    this.cartStore.RemoveCartProducts({productId, product:updatedProduct})
 }


 increment(productId:string){
    
    this.cartStore.increment(productId)
 }
 decrement(productId:string){

   this.cartStore.decerement(productId)
 }
}
