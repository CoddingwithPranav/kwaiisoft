import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserStore } from './store/user.store';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
Store = inject(UserStore)
userService = inject(UserService)
  constructor(private Auth:AuthService, private router:Router){
   if(typeof document != 'undefined'){

     this.Store.loadUser('');
     
   }
    this.Auth.currentUser$.subscribe((res:any)=>{
      if(typeof document != 'undefined'){
        if(res != null){
          let url = window.location.pathname
           this.router.navigate([url])
          }
          else{
           this.router.navigate(['auth/login'])
         }
      }
    })
   
  }


}
