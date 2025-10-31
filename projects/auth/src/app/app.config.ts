import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthRepository, AuthRepositoryImpl, provideData } from 'data';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideData({ apiBaseUrl: 'https://fakestoreapi.com' }),
    // If you want to bind abstract ports to impls (optional):
    { provide: AuthRepository, useExisting: AuthRepositoryImpl },
    // { provide: UsersRepository, useExisting: UsersRepositoryImpl },
  ],
};
