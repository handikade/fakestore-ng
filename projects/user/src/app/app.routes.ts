import { Routes } from '@angular/router';
import { provideApiUrl, provideUsersRepository } from 'data';

export const routes: Routes = [
  {
    path: '',
    providers: [provideApiUrl('https://fakestoreapi.com'), provideUsersRepository()],
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
