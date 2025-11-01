import { InjectionToken } from '@angular/core';
import { AuthRepository } from './repositories/auth.repository';

/**
 * Injection token for the AuthRepository.
 * @see provideAuthRepository
 */
export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AUTH_REPOSITORY');
