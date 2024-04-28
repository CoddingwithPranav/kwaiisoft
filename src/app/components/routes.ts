import { Route } from "@angular/router";
import { HomeViewComponent } from "./home/home-view/home-view.component";
import { MainComponent } from "./main/main.component";

export  const LoggedIN_ROUTES: Route[] = [
    {path: '', component: MainComponent, children:[

      {path: 'home', 
      loadComponent:()=>import('./home/home-view/home-view.component').then((a)=>a.HomeViewComponent)

      },
      {path: 'profile', 
      loadComponent:()=>import('./profile-info/profile-info.component').then((a)=>a.ProfileInfoComponent)

      },
      {path: 'shop', 
      loadComponent:()=>import('./kawiiMerch/product-list/product-list.component').then((a)=>a.ProductListComponent),
    
      },
      {path:'cart',
      loadComponent:()=>import('./kawiiMerch/cart/cart.component').then((a)=>a.CartComponent)
      },
      {path:'wishlist',
      loadComponent:()=>import('./kawiiMerch/wishlist/wishlist.component').then((a)=>a.WishlistComponent)
      },
      {path:'product/:id',
      loadComponent:()=>import('./kawiiMerch/product-view/product-view.component').then((a)=>a.ProductViewComponent)
      },
      {path:'chat',
      loadComponent:()=>import('./kawiiChatt/kawii-chatt/kawii-chatt.component').then((a)=>a.KawiiChattComponent)
      },
      {path:'gemini',
      loadComponent:()=>import('./geminichat/gemini-chat/gemini-chat.component').then((a)=>a.GeminiChatComponent)
      }
    ]},

  ];