import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";


export  const LoggedOUT_ROUTES: Route[] =[
    {path: 'login', loadComponent:()=>import('./login/login.component').then((a)=>a.LoginComponent) },
    {path: 'register', loadComponent:()=>import('./register/register.component').then((a)=>a.RegisterComponent) },

  ] 