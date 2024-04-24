import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch:'full',
     redirectTo:'kwaii/home'
    },
    {path: 'kwaii', 
    loadChildren: () => import('./components/routes').then((a)=>a.LoggedIN_ROUTES)
    },
    {path: 'auth', 
    loadChildren: () => import('./AuthComponents/auth.routes').then((a)=>a.LoggedOUT_ROUTES)
    },
  
];
