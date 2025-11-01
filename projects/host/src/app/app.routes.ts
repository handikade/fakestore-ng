import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => loadRemoteModule('auth', './App').then((m) => m.App),
    loadChildren: () => loadRemoteModule('auth', './routes').then((m) => m.routes),
  },

  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => loadRemoteModule('dashboard', './App').then((m) => m.App),
      },

      {
        path: 'user',
        loadComponent: () => loadRemoteModule('user', './App').then((m) => m.App),
        loadChildren: () => loadRemoteModule('user', './routes').then((m) => m.routes),
      },

      {
        path: 'product',
        loadComponent: () => loadRemoteModule('product', './App').then((m) => m.App),
        loadChildren: () => loadRemoteModule('product', './routes').then((m) => m.routes),
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'auth',
  },
];
