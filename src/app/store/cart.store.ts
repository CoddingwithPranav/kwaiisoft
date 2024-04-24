import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Product } from '../models/product';
import { Injectable, computed, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, debounceTime, distinctUntilChanged, tap, switchMap, take } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HotToastService } from '@ngneat/hot-toast';

export interface cartState {
  products: Product[];
  totalPrice: number;
}

export const initialCartState: cartState = {
  products: [],
  totalPrice: 0,
};
export function calculateTotalPrice(products: Product[]) {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
}

export const CartStore = signalStore(
  { providedIn: 'root'},/// it will be provide every where in Application 
  withState(initialCartState),

  withComputed(({products})=>({
     totalPrice:computed(()=> calculateTotalPrice(products())),
  })),

  withMethods(({ products, ...store }, Service = inject(ProductService), hotToastService = inject(HotToastService)) => ({
    loadCartProducts: rxMethod<string>(
        pipe(
          // debounceTime(300),
          // distinctUntilChanged(),
          switchMap(() => {
            return Service.getCartItems().pipe(
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
    RemoveCartProducts: rxMethod<{productId:string, product:Product}>(
        pipe(
          // debounceTime(300),
          // distinctUntilChanged(),
          switchMap(({productId, product}) => {
            return Service.removeFormCart(productId).pipe(
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
    addCartProducts: rxMethod<{productId:string, product:Product}>(
        pipe(
          // debounceTime(300),
          // distinctUntilChanged(),
          switchMap(({productId, product}) => {
            return Service.addToCart(productId, product).pipe(
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
    increment(id:string){
        const updatedProduct = products().map((product)=>
        product.id == id ? {...product, quantity:product.quantity+1} : product);
        patchState(store, {products:updatedProduct});
    },

    decerement(id:string){
        const  updatedProduct = products().map((product)=>
            product.id == id ?{...product, quantity:product.quantity -1}: product
        );
        patchState(store, {products:updatedProduct});
    }


  }))
);
