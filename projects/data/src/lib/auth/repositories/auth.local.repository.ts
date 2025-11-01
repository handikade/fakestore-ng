/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { AuthRepository } from './auth.repository';

import type { AuthLoginPayload } from '../types/login-payload.type';
import type { AuthLoginResponse } from '../types/login-response.type';

/**
 * The local implementation of the AuthRepository.
 * This is used for testing or local development.
 * @see AuthRepository
 * @see AuthHttpRepository
 */
@Injectable()
export class AuthLocalRepository implements AuthRepository {
  login(payload: AuthLoginPayload): Promise<AuthLoginResponse | null> {
    return Promise.resolve({ token: 'local' });
  }
}
