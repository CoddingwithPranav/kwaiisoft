import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product } from '../models/product';
import {  inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, take } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HotToastService } from '@ngneat/hot-toast';

export interface wishlistState {
  products: Product[];
}

export const initialwishlistState: wishlistState = {
  products: [],
};


export const wishListStore = signalStore(
  { providedIn: 'root'},/// it will be provide every where in Application 
  withState(initialwishlistState),

  withMethods(({ products, ...store }, Service = inject(ProductService), hotToastService = inject(HotToastService)) => ({
    loadWishlistProducts: rxMethod<string>(
        pipe(
       
          switchMap(() => {
            return Service.getWishlistItems().pipe(
              tapResponse({
                next: (res) =>{
                  patchState(store, { products:res })
                },
                error: (err) => {
                  patchState(store);
                  console.error(err);
                },
              })
            );
          })
        )
      ),
    RemovewishlistProducts: rxMethod<{productId:string, product:Product}>(
        pipe(
        
          switchMap(({productId, product}) => {
            return Service.removeFormWishlist(productId).pipe(
              take(1),
              tapResponse({ 
                next: (res) =>{
                  const updatedProduct = products().filter((a)=>a.id !== productId);
                  patchState(store, {products:updatedProduct});
                  hotToastService.success('Product removed');
                },
                error: (err:string) => {
                  patchState(store);
                  hotToastService.success('error'+ err);
                },
              })
            );
          })
        )
      ),
    addWishListProducts: rxMethod<{productId:string, product:Product}>(
        pipe(
          
          switchMap(({productId, product}) => {
            return Service.addToWishlist(productId, product).pipe(
              take(1),
              tapResponse({ 
                next: (res) =>{
                  const updatedProducts = [...products(), product];
                  patchState(store, { products:updatedProducts});
                  hotToastService.success('Product removed');
                },
                error: (err:string) => {
                  patchState(store);
                  hotToastService.success('error'+ err);
                },
              })
            );
          })
        )
      ),
   


  }))
);
