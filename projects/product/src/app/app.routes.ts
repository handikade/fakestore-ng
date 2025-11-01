import { Routes } from '@angular/router';
import { provideApiUrl, provideProductsRepository } from 'data';

export const routes: Routes = [
  {
    path: '',
    providers: [provideApiUrl('https://fakestoreapi.com'), provideProductsRepository()],
    children: [
      {
        path: '',
        loadComponent: () => import('./list/list').then((m) => m.List),
      },
      {
        path: ':id',
        loadComponent: () => import('./detail/detail').then((m) => m.Detail),
      },
    ],
  },
];
