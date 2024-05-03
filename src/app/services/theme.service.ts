import { Injectable, inject, signal } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  ngxService= inject(NgxUiLoaderService) 
  selectedTheme = signal('green');
  backgroundImgPath = signal({
    homeBackground:'../../../assets/Svg/blob-scene-haikei.svg',
    profileBackgound:'../../../assets/Svg/Cloudy.svg'
  })
  settheme(theme?:string){
    if(typeof document !='undefined'){
      if(theme =='secondtheme'){
        this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
        // Stop the foreground loading after 5s
        setTimeout(() => {
          this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
        }, 200);
        document.body.classList.add('secondtheme');
        this.backgroundImgPath.set(
          {
            homeBackground:'../../../assets/Svg/BlueHomeBackground.svg',
            profileBackgound:'../../../assets/Svg/BlueCloud.svg'
          }
        )
        localStorage.setItem('theme', theme);
      }
      else{
        this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
        // Stop the foreground loading after 5s
        setTimeout(() => {
          this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
        }, 200);
        document.body.classList.remove('secondtheme');
        this.backgroundImgPath.set(
          {
            homeBackground:'../../../assets/Svg/blob-scene-haikei.svg',
            profileBackgound:'../../../assets/Svg/Cloudy.svg'
          }
        )
        localStorage.removeItem('theme')
      }
    }
  }

  applythemeOnRefresh(){
   if(typeof document != 'undefined'){
    let theme = localStorage.getItem('theme');
    if(theme=='secondtheme'){
      document.body.className = 'secondtheme';
      this.backgroundImgPath.set(
        {
          homeBackground:'../../../assets/Svg/BlueHomeBackground.svg',
          profileBackgound:'../../../assets/Svg/BlueCloud.svg'
        }
      )
    }
   }
  }
}
