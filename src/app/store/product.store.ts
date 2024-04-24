import { computed, inject } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { tapResponse } from "@ngrx/operators";
import { signalStore, withState, withComputed, withMethods, patchState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, take } from "rxjs";
import { Product } from "../models/product";
import { ProductService } from "../services/product.service";
import { initialCartState, calculateTotalPrice } from "./cart.store";

export interface productState {
    products: Product[];
    viewProduct:Product;
  }
  
  export const initialProductState: productState = {
    products: [],
    viewProduct :{
      id :"",
      title : "",
      description : "",
      details : "",
      price : 0,
      discount : 0,
      quantity : 0,
      isActive : false,
      productImgPath : "",
      selectedImage : "",
      isFeatured : false,
      wishlisted : false
    },
  };
  
  
  export const ProductStore = signalStore(
    { providedIn: 'root'},
    withState(initialProductState),
 
    withMethods(({ products,viewProduct,  ...store }, Service = inject(ProductService), hotToastService = inject(HotToastService)) => ({
      loadProducts: rxMethod<string>(
          pipe(
            switchMap(() => {
              return Service.getAllProduct.pipe(
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
      loadOneProducts: rxMethod<string>(
          pipe(
            switchMap((id:string) => {
              return Service.getProudctById(id).pipe(
                tapResponse({
                  next: (res) =>{
                    patchState(store, { viewProduct:res })
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
    
    }))
  );