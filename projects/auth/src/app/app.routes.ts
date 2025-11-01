import { Routes } from '@angular/router';
import { provideApiUrl, provideAuthRepository } from 'data';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: '',
    providers: [provideApiUrl('https://fakestoreapi.com'), provideAuthRepository()],
    children: [
      { path: 'login', component: Login },
      { path: '**', redirectTo: 'login' },
    ],
  },
];
