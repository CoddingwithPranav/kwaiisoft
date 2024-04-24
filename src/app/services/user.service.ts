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
import { Observable, forkJoin, from, map, of, switchMap, take, throwError } from 'rxjs';
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




  loadProfileObs(): Observable<userDetails> {
    let uid =''
    const data = localStorage.getItem('token');
    if(data){
       uid = JSON.parse(data);
       this.UidSignal.set(uid)
    }
    const collectionInstance = collection(this.firestore, 'users');
    const q = query(collectionInstance, where('uid', '==', uid));
    return from(collectionData(q, { idField: 'id' })).pipe(
      
      switchMap((userDocSnapshot:any) => {
        const userData:ProfileUser = userDocSnapshot[0]
        // Get the cart collection reference based on user ID
        let uid:any = userData.uid
        const cartCollectionRef = collection( this.firestore,'users',uid ,'cart');
  
        return from(collectionData(cartCollectionRef, { idField: 'id' })).pipe(
          map((cartSnapshot) => {
            const cartItems:any = cartSnapshot 
            return { user:userData, cart: cartItems }; // Combine user and cart data
          })
        );
      })
    );
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
