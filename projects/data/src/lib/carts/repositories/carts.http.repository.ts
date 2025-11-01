import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, of } from 'rxjs';
import { API_URL } from '../../api.token';
import { Cart } from '../types/cart.type';
import { CartsRepository } from './carts.repository';

/**
 * The HTTP implementation of the CartsRepository.
 * @see CartsRepository
 * @see CartsLocalRepository
 */
@Injectable()
export class CartsHttpRepository implements CartsRepository {
  private readonly _http = inject(HttpClient);
  private readonly _url = `${inject(API_URL)}/carts`;

  getAll(): Promise<Cart[] | null> {
    const api$ = this._http.get<Cart[]>(this._url).pipe(
      catchError(() => {
        console.error('Failed to get all carts');
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }

  getById(id: number): Promise<Cart | null> {
    const api$ = this._http.get<Cart>(`${this._url}/${id}`).pipe(
      catchError(() => {
        console.error(`Failed to get cart with id ${id}`);
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }

  getByUser(userId: number): Promise<Cart[] | null> {
    const api$ = this._http.get<Cart[]>(`${this._url}/user/${userId}`).pipe(
      catchError(() => {
        console.error(`Failed to get carts for user with id ${userId}`);
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }
}
