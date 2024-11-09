import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { rootReducer } from './store/store.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideRouter(routes),
    provideStore(rootReducer),
    provideEffects([]), // Register effects at the root level here
    provideStoreDevtools({
      maxAge: 25, // Number of actions to retain
      logOnly: false // Set to true for production
    }), provideAnimationsAsync(),
  ],
};
