import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => loadRemoteModule('auth', './App').then((m) => m.App),
    loadChildren: () => loadRemoteModule('auth', './routes').then((m) => m.routes),
  },

  {
    path: 'dashboard',
    loadComponent: () => loadRemoteModule('dashboard', './App').then((m) => m.App),
  },

  {
    path: 'user',
    loadComponent: () => loadRemoteModule('user', './App').then((m) => m.App),
  },

  {
    path: '**',
    redirectTo: 'auth',
  },
];
