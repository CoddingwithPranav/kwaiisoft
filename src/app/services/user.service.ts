import { inject, Injectable, signal } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { Observable, catchError, combineLatest, forkJoin, from, map, of, switchMap, take, throwError } from 'rxjs';
import { ProfileUser } from '../models/user';
import { Auth, authState } from '@angular/fire/auth';
import { userDetails } from '../models/userDetails';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore = inject(Firestore);
  storage = inject(AngularFireStorage);
  router = inject(Router);
  toast = inject(HotToastService);
  auth = inject(Auth);
  currentUser$ = authState(this.auth);

  UidSignal = signal("")




  // loadProfileObs(): Observable<any> {
  //   let uid =''
  //   const data = localStorage.getItem('token');
  //   if(data){
  //      uid = JSON.parse(data);
  //      this.UidSignal.set(uid)
  //   }
  //   const collectionInstance = collection(this.firestore, 'users');
  //   const q = query(collectionInstance, where('uid', '==', uid));
  //   return from(collectionData(q, { idField: 'id' })).pipe(
      
  //     switchMap((userDocSnapshot:any) => {
  //       const userData:ProfileUser = userDocSnapshot[0]
  //       // Get the cart collection reference based on user ID
  //       let uid:any = userData.uid
  //       const cartCollectionRef = collection( this.firestore,'users',uid ,'cart');
  
  //       return from(collectionData(cartCollectionRef, { idField: 'id' })).pipe(
  //         map((cartSnapshot) => {
  //           const cartItems:any = cartSnapshot 
  //           return { user:userData, cart: cartItems }; // Combine user and cart data
  //         })
  //       );
  //     })
  //   );
  // }
  // loadProfileObs(): Observable<userDetails> {
  //   let uid =''
  //   const data = localStorage.getItem('token');
  //   if(data){
  //      uid = JSON.parse(data);
  //      this.UidSignal.set(uid)
  //   }
  //   const collectionInstance = collection(this.firestore, 'users');
  //   const q = query(collectionInstance, where('uid', '==', uid));
  //   return from(collectionData(q, { idField: 'id' })).pipe(
      
  //     switchMap((userDocSnapshot:any) => {
  //       const userData:ProfileUser = userDocSnapshot[0]
  //       // Get the cart collection reference based on user ID
  //       let obj= {user:userData}
  //       let uid:any = userData.uid
        
  //       const cartCollectionRef = collection( this.firestore,'users',uid ,'cart');
  //       const wishlistCollectionRef = collection( this.firestore,'users',uid ,'wishlist');
  
  //       return forkJoin([
  //         from(collectionData(cartCollectionRef, { idField: 'id' })).pipe(
  //           map((cartSnapshot) => {
  //             const cartItems:any = cartSnapshot 
  //         console.log("cart",cartItems);

              
  //             return cartItems
  //           })
  //         ), 
  //         from(collectionData(wishlistCollectionRef, { idField: 'id' })).pipe(
  //           map((wishlistSnapshot) => {
  //             const wishlistItems:any = wishlistSnapshot 
  //         console.log("wishlist",wishlistItems);

  //             return wishlistItems
  //           })
  //         )

  //       ]).pipe(map(([cartItems, wishlistItems])=>{
  //         console.log("hi");
          
  //          console.log("user",userData);

  //         console.log("wishlist",wishlistItems);
  //         console.log("cart",cartItems);


  //         return {
  //           user:userData,
  //           cart:cartItems,
  //           wishlist: wishlistItems
  //         }
  //       }))
        
  //     })
  //   );
  // }
  loadProfileObs(): Observable<userDetails> {
    let uid =''
    const data = localStorage.getItem('token');
    if(data){
       uid = JSON.parse(data);
       this.UidSignal.set(uid)
    }
    return this.getUserSnapshot(uid).pipe(
      switchMap((userDocSnapshot: any) => {
        if (!userDocSnapshot || userDocSnapshot.length === 0) {
          return throwError('User document not found');
        }
        const userData = userDocSnapshot[0];
        const uidValue = userData.uid;
        
        const cartItems$ = this.getCollectionData('users', uidValue, 'cart');
        const wishlistItems$ = this.getCollectionData('users', uidValue, 'wishlist');
        return combineLatest([cartItems$, wishlistItems$]).pipe(
          map(([cartItems, wishlistItems]) => ({
            user: userData,
            cart: cartItems,
            wishlist: wishlistItems
          })),
          catchError(error => throwError('Failed to fetch cart or wishlist items', error))
        );
      }),
      catchError(error => throwError('Failed to fetch user document', error))
    );
  }



  private getUserSnapshot(uid: string): Observable<any> {
    const collectionRef = collection(this.firestore, 'users');
    const q = query(collectionRef, where('uid', '==', uid));
    return from(collectionData(q, { idField: 'id' }));
  }

  private getCollectionData(parent: string, uid: string, child: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, parent, uid, child);
    return from(collectionData(collectionRef, { idField: 'id' }));
  }


  uplaoadProfileImg(selectedImg:any , profileForm:ProfileUser){
    let uid:any = profileForm.uid;
    const filePath =`UserImg/ ${uid}`
    if(selectedImg !=''){
      this.storage.upload(filePath, selectedImg).then(()=>{
        this.storage.ref(filePath).getDownloadURL().pipe().subscribe(URL =>{
          profileForm.profileImg = URL;
          this.updateDataObservable(uid , profileForm)
        })
      })
    }else{
      this.updateDataObservable(uid , profileForm)
    }

  }

  updateDataObservable(id:string, profileForm:any ){

    const docInstance = doc(this.firestore, 'users', id);
    of(updateDoc(docInstance, profileForm)).pipe(
      take(1),
      this.toast.observe({
        loading: 'Logging in...',
        error:'Incorrect Data',
        success: 'Data as been successfully Updated',
      })
    ).subscribe((res)=>{
       
      })



  }

  get allUsers$():Observable<ProfileUser[]>{
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>
  }


}
