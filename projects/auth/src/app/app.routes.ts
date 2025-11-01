import { Routes } from '@angular/router';
import { AuthRemoteDataSource, AuthRepository, AuthRepositoryImpl, provideData } from 'data';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: '',
    providers: [
      provideData({ apiBaseUrl: 'https://fakestoreapi.com' }),
      AuthRemoteDataSource,
      { provide: AuthRepository, useClass: AuthRepositoryImpl },
    ],
    children: [
      { path: 'login', component: Login },
      { path: '**', redirectTo: 'login' },
    ],
  },
];
