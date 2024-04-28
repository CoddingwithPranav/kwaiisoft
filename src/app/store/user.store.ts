import { inject } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { tapResponse } from "@ngrx/operators";
import { signalStore, withState, withMethods, patchState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap } from "rxjs";
import { Product } from "../models/product";
import { ProfileUser } from "../models/user";
import { UserService } from "../services/user.service";

export interface userState{
    user:ProfileUser,
    cart:Product[],
    wishlist:Product[],
}

export const initialUserState:userState={
 user:{},
 cart:[],
 wishlist:[]
}
  
  export const UserStore = signalStore(
    { providedIn: 'root'},
    withState(initialUserState),
 
    withMethods(({ user,cart, wishlist , ...store }, Service = inject(UserService), hotToastService = inject(HotToastService)) => ({
      loadUser: rxMethod<string>(
          pipe(
            switchMap(() => {
              return Service.loadProfileObs().pipe(
                tapResponse({
                  next: (userDetails) =>{
                    patchState(store, { user:userDetails.user , cart:userDetails.cart, wishlist:userDetails.wishlist })
                  },
                  error: (err) => {
                    hotToastService.error("Unable to connect with Server")
                    patchState(store);
                    
                  },
                })
              );
            })
          )
        ),
    
    }))
  );