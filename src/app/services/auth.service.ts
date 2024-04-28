import { Injectable, inject } from '@angular/core';
import {AngularFireAuth} from  '@angular/fire/compat/auth';
import {GoogleAuthProvider, Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword} from  '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from, tap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from './user.service';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInGuard:boolean = false;
  fireAuth  = inject(AngularFireAuth);
  firestore = inject(Firestore);
  userService  = inject(UserService);
  router = inject(Router);
  auth = inject(Auth);
  toast = inject(HotToastService);
  currentUser$ = authState(this.auth);
  loggedInUser:any;

  // forget Password
  forgetPassword(email:string){


  }
  SendVerificationMail() {
    return this.fireAuth.currentUser
      .then((user:any) => {
        return user.sendEmailVerification();
        debugger;
      })
      .then(() => {
        this.router.navigate(['auth/verify-email-address']);
      });
  }
  sendEmailForVarification(user:any){
    user.sendEmailForVarification().then((res:any) =>{
      this.router.navigate(['auth/verify-email'])
      debugger;
    },
     (err:any) =>{
       alert(err.message)
    })
  }

  signWithGoogle(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then((res:any)=>{
     const data={
      uid:res.user._delegate.uid,
      displayName:res.user._delegate.displayName,
      name:res.additionalUserInfo.profile.name,
      email:res.additionalUserInfo.profile.email,
      profileImg:res.additionalUserInfo.profile.picture,
      verified_email:res.additionalUserInfo.profile.verified_email,

     }
     const collectionInstance = collection(this.firestore, 'users')
     addDoc(collectionInstance, data).then((res)=>{
         this.toast.success("Successfully Logined");
         localStorage.setItem('token', JSON.stringify(data.uid))
         this.router.navigate(['kwaii/home'])/// to change page
     })



    this.router.navigate(['kwaii/home']);
    localStorage.setItem('token', JSON.stringify(res.user?.uid))
    }, error=>{
      alert(error.message)
    })
  }
  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
     this.toast.observe({
       success: 'Congrats! You are all signed up',
       loading  : 'Signing up...',
       error:'Something Went wrong'
       })
   );
  }
  addUser(res:any, formvalue:any): void{
    const userdata = {
      uid:res.user.uid,
      displayName: formvalue.displayName,
      email:formvalue.email,
      password:formvalue.password
    }
    const userUid = res.user.uid; // Get the user's UID from the Firebase response
    const docInstance = doc(this.firestore, 'users', userUid)
    setDoc(docInstance, userdata).then((res)=>{
        this.toast.success("Successfully Saved");
        localStorage.setItem('token', JSON.stringify(userdata.uid))
        this.router.navigate(['kwaii/home'])/// to change page
    })
  }
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error:'Incorrect Data'
      }),
      tap(()=> this.router.navigate(['kwaii/home']))
    );
  }
  logout(): Observable<any> {
    localStorage.removeItem('token');
    return from(this.auth.signOut()).pipe(
      this.toast.observe({
        success: 'successfully logout',
        loading: 'Logging  Out...',
        error:'Cannot logout'
      })
    );
  }




    //login method
  // login(email:string, password:string){
  //   this.fireAuth.signInWithEmailAndPassword(email, password).then((res)=>{
  //     localStorage.setItem('token', 'true');
  //     if(res.user?.emailVerified == true){
  //       this.router.navigate(['/home']);
  //     }else{
  //       this.router.navigate(['/verify-email'])
  //     }

  //   }, err =>{
  //      alert(err.message);
  //      this.router.navigate(['/login'])
  //   })
  // }

  //register method
  // register(email:string, password:string){
  //   this.fireAuth.createUserWithEmailAndPassword(email, password).then((res)=>{
  //     alert('Registration Successfull');
  //     this.sendEmailForVarification(res.user)
  //   }, err =>{
  //     alert(err.message);
  //     this.router.navigate(['/register'])
  //   })
  // }


  // logout(){
  //   this.fireAuth.signOut().then(()=>{
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login'])
  //   },
  //   err=>{
  //     alert(err.message);
  //   })
  // }

}
