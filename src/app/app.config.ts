import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage  , getStorage} from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environment/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';



const firebaseProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
  provideStorage(() => getStorage()),
]);
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: { "projectId": "kwaiisoft", "appId": "1:140244723331:web:6a96fe35256f6cfbbc5db6", "storageBucket": "kwaiisoft.appspot.com", "apiKey": "AIzaSyC0M_lO4b01n4ynNaRyHE1nXEnzs9BcG68", "authDomain": "kwaiisoft.firebaseapp.com", "messagingSenderId": "140244723331" } },
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideHotToastConfig(),
    firebaseProviders
  ],
};
