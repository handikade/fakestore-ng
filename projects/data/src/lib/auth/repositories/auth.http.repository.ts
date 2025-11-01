import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthRepository } from './auth.repository';

import type { AuthLoginPayload } from '../types/login-payload.type';
import type { AuthLoginResponse } from '../types/login-response.type';

@Injectable()
export class AuthHttpRepository implements AuthRepository {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'https://fakestoreapi.com/auth/login';

  login(payload: AuthLoginPayload): Promise<AuthLoginResponse> {
    const api$ = this._http.post<AuthLoginResponse>(this._url, payload);

    return lastValueFrom(api$);
  }
}
