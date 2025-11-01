import { InjectionToken } from '@angular/core';
import { UsersRepository } from './repositories/users.repository';

/**
 * Injection token for the UsersRepository.
 * @see provideUsersRepository
 */
export const USERS_REPOSITORY = new InjectionToken<UsersRepository>('USERS_REPOSITORY');
