import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, lastValueFrom, of } from 'rxjs';
import { API_URL } from '../../api.token';
import { AuthRepository } from './auth.repository';

import type { AuthLoginPayload } from '../types/login-payload.type';
import type { AuthLoginResponse } from '../types/login-response.type';

/**
 * The HTTP implementation of the AuthRepository.
 * @see AuthRepository
 * @see AuthLocalRepository
 */
@Injectable()
export class AuthHttpRepository implements AuthRepository {
  private readonly _http = inject(HttpClient);
  private readonly _url = `${inject(API_URL)}/auth/login`;

  login(payload: AuthLoginPayload): Promise<AuthLoginResponse | null> {
    const api$ = this._http.post<AuthLoginResponse>(this._url, payload).pipe(
      catchError(() => {
        console.error('Login failed');
        return of(null);
      })
    );

    return lastValueFrom(api$);
  }
}
