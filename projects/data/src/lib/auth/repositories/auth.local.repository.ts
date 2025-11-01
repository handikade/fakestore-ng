/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { AuthRepository } from './auth.repository';

import type { AuthLoginPayload } from '../types/login-payload.type';
import type { AuthLoginResponse } from '../types/login-response.type';

@Injectable()
export class AuthLocalRepository implements AuthRepository {
  login(payload: AuthLoginPayload): Promise<AuthLoginResponse> {
    return Promise.resolve({ token: 'local' });
  }
}
