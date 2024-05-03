import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserStore } from './store/user.store';
import { UserService } from './services/user.service';
import { ThemeService } from './services/theme.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
Store = inject(UserStore)
userService = inject(UserService)
theme = inject(ThemeService)
  constructor(private Auth:AuthService, private router:Router, private ngxService: NgxUiLoaderService){
    this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 3000);
   if(typeof document != 'undefined'){

     this.Store.loadUser('');
     
   }
    this.Auth.currentUser$.subscribe((res:any)=>{
      if(typeof document != 'undefined'){
        if(res != null){
          let url = window.location.pathname
          this.router.navigate([url])
          this.theme.applythemeOnRefresh()

          }
          else{
           this.router.navigate(['auth/login'])
         }
      }
    })
   
  }


}
