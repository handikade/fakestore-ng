import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, of } from 'rxjs';
import { API_URL } from '../../api.token';
import { User } from '../types/user.type';
import { UsersRepository } from './users.repository';

/**
 * The HTTP implementation of the UsersRepository.
 * @see UsersRepository
 * @see UsersLocalRepository
 */
@Injectable()
export class UsersHttpRepository implements UsersRepository {
  private readonly _http = inject(HttpClient);
  private readonly _url = `${inject(API_URL)}/users`;

  getAll(): Promise<User[] | null> {
    const api$ = this._http.get<User[]>(this._url).pipe(
      catchError(() => {
        console.error('Failed to get all users');
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }

  getById(id: number): Promise<User | null> {
    const api$ = this._http.get<User>(`${this._url}/${id}`).pipe(
      catchError(() => {
        console.error(`Failed to get user with id ${id}`);
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }

  get(payload: { offset: number; limit: number }): Promise<User[] | null> {
    const { offset, limit } = payload;

    const api$ = this._http.get<User[]>(`${this._url}?offset=${offset}&limit=${limit}`).pipe(
      catchError(() => {
        console.error('Failed to get users with pagination');
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }
}
