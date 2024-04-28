import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, concatMap, from, map, of, switchMap, take } from 'rxjs';
import { Product } from '../models/product';
import { UserService } from './user.service';
import { UserStore } from '../store/user.store';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  firestore = inject(Firestore);
  userService = inject(UserService);
  userStore = inject(UserStore);
  userId!: string;
  constructor() {
    
  }
  get getAllProduct(): Observable<Product[]> {
    const ref = collection(this.firestore, 'products');
    const queryAll = query(ref);
    return collectionData(queryAll, { idField: 'id' }).pipe(
      map((products) => {
        return products.map((product) => {
          return { ...product, quantity: 1 };
        });
      })
    ) as Observable<Product[]>;
  }


  getProudctById(id: string): Observable<Product> {
    const docInstance = doc(this.firestore, 'products', id);
    return docData(docInstance) as Observable<Product>;
  }
 
  addToCart(productId: string, product: Product): Observable<any> {
    let uid = this.userService.UidSignal()
    const userCartRef = collection(
      this.firestore,
      'users',
       uid,
      'cart'
    );
    const productRef = doc(userCartRef, productId);

    const productData = { ...product };
    productData.Incart = true
 
    
    return from(setDoc(productRef, productData));
    // return this.userService.currentUser$.pipe(
    //   take(1),
    //   concatMap((user: any) => {
    //     const userCartRef = collection(
    //       this.firestore,
    //       'users',
    //       user.uid,
    //       'cart'
    //     );
    //     const productRef = doc(userCartRef, productId);

    //     const productData = { ...product };
    //     return from(setDoc(productRef, productData));
    //   })
    // );
  }
  addToWishlist(productId: string, product: Product): Observable<any> {
    let uid = this.userService.UidSignal()
    const userCartRef = collection(
      this.firestore,
      'users',
       uid,
      'wishlist'
    );
    const productRef = doc(userCartRef, productId);

    const productData = { ...product };
    productData.IsWishlisted = true;
    return from(setDoc(productRef, productData));
    // return this.userService.currentUser$.pipe(
    //   take(1),
    //   concatMap((user: any) => {
    //     const userCartRef = collection(
    //       this.firestore,
    //       'users',
    //       user.uid,
    //       'cart'
    //     );
    //     const productRef = doc(userCartRef, productId);

    //     const productData = { ...product };
    //     return from(setDoc(productRef, productData));
    //   })
    // );
  }
  removeFormCart(productId: string): Observable<any> {
    let uid = this.userService.UidSignal()
    const userCartRef = collection(
      this.firestore,
      'users',
      uid,
      'cart'
    );
    const productRef = doc(userCartRef, productId);
    return from(deleteDoc(productRef));

    // return from(deleteDoc(productRef));
    // return this.userService.currentUser$.pipe(
    //   take(1),
    //   concatMap((user: any) => {
    //     const userCartRef = collection(
    //       this.firestore,
    //       'users',
    //       user.uid,
    //       'cart'
    //     );
    //     const productRef = doc(userCartRef, productId);

    //     return from(deleteDoc(productRef));
    //   })
    // );
  }
  removeFormWishlist(productId: string): Observable<any> {
    let uid = this.userService.UidSignal()
    const userCartRef = collection(
      this.firestore,
      'users',
      uid,
      'wishlist'
    );
    const productRef = doc(userCartRef, productId);
    console.log(productId, productRef);
    
    return from(deleteDoc(productRef));

    // return from(deleteDoc(productRef));
    // return this.userService.currentUser$.pipe(
    //   take(1),
    //   concatMap((user: any) => {
    //     const userCartRef = collection(
    //       this.firestore,
    //       'users',
    //       user.uid,
    //       'cart'
    //     );
    //     const productRef = doc(userCartRef, productId);

    //     return from(deleteDoc(productRef));
    //   })
    // );
  }

  getCartItems(): Observable<any> {
    let uid = this.userService.UidSignal()
   
    const userCartRef = collection(
            this.firestore,
            'users',
            uid,
            'cart'
          );
          return from(getDocs(userCartRef)).pipe(
            map((querySnapshot: any) => {
              const cartItems: any[] = [];
              
              querySnapshot.forEach((item: any) => {
                const product= item.data();
                
                  cartItems.push(product);
             
              });
  
              return cartItems;
            })
          );
    // return this.userService.currentUser$.pipe(
    //   take(1),
    //   concatMap((user: any) => {
    //     const userCartRef = collection(
    //       this.firestore,
    //       'users',
    //       user.uid,
    //       'cart'
    //     );
    //     return from(getDocs(userCartRef)).pipe(
    //       map((querySnapshot: any) => {
    //         const cartItems: any[] = [];
            
    //         querySnapshot.forEach((item: any) => {
    //           const product= item.data();
              
    //             cartItems.push(product);
           
    //         });

    //         return cartItems;
    //       })
    //     );
    //   })
    // );
  }
  getWishlistItems(): Observable<any> {
    let uid = this.userService.UidSignal()
   
    const userCartRef = collection(
            this.firestore,
            'users',
            uid,
            'wishlist'
          );
          return from(getDocs(userCartRef)).pipe(
            map((querySnapshot: any) => {
              const cartItems: any[] = [];
              
              querySnapshot.forEach((item: any) => {
                const product= item.data();
                
                  cartItems.push(product);
             
              });
  
              return cartItems;
            })
          );
    // return this.userService.currentUser$.pipe(
    //   take(1),
    //   concatMap((user: any) => {
    //     const userCartRef = collection(
    //       this.firestore,
    //       'users',
    //       user.uid,
    //       'cart'
    //     );
    //     return from(getDocs(userCartRef)).pipe(
    //       map((querySnapshot: any) => {
    //         const cartItems: any[] = [];
            
    //         querySnapshot.forEach((item: any) => {
    //           const product= item.data();
              
    //             cartItems.push(product);
           
    //         });

    //         return cartItems;
    //       })
    //     );
    //   })
    // );
  }

  // getCartItems(): Observable<any[]> {
  //   return this.userService.currentUser$.pipe(
  //     take(1),
  //     concatMap((user: any) => {
  //       const userCartRef = collection(this.firestore, 'users', user.uid, 'cart');
  //       return from(getDocs(userCartRef)).pipe(
  //         switchMap((querySnapshot: any) => {
  //           const cartItemsObservables: Observable<any>[] = [];

  //           querySnapshot.forEach((item: any) => {
  //             const productId = item.id;
  //             const docInstance = doc(this.firestore, 'products', productId);
  //             const product$ = docData(docInstance).pipe(
  //               map((res: any) => ({
  //                 ...res,
  //                 quantity: item.data().quantity  // Assuming quantity is directly accessible here
  //               }))
  //             );
  //             cartItemsObservables.push(product$);
  //           });

  //           return forkJoin(cartItemsObservables); // Wait for all product observables to complete
  //         })
  //       );
  //     })
  //   );
  // }
}
