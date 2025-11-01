import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, of } from 'rxjs';
import { API_URL } from '../../api.token';
import { Product } from '../types/product.type';
import { ProductsRepository } from './products.repository';

/**
 * The HTTP implementation of the ProductsRepository.
 * @see ProductsRepository
 * @see ProductsLocalRepository
 */
@Injectable()
export class ProductsHttpRepository implements ProductsRepository {
  private readonly _http = inject(HttpClient);
  private readonly _url = `${inject(API_URL)}/products`;

  getAll(): Promise<Product[] | null> {
    const api$ = this._http.get<Product[]>(this._url).pipe(
      catchError(() => {
        console.error('Failed to get all products');
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }

  getById(id: number): Promise<Product | null> {
    const api$ = this._http.get<Product>(`${this._url}/${id}`).pipe(
      catchError(() => {
        console.error(`Failed to get product with id ${id}`);
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }

  getAllCategories(): Promise<string[] | null> {
    const api$ = this._http.get<string[]>(`${this._url}/categories`).pipe(
      catchError(() => {
        console.error('Failed to get all categories');
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }

  getByCategory(category: string): Promise<Product[] | null> {
    const api$ = this._http.get<Product[]>(`${this._url}/category/${category}`).pipe(
      catchError(() => {
        console.error(`Failed to get products in category ${category}`);
        return of(null);
      }),
    );

    return lastValueFrom(api$);
  }
}
