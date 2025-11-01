import { UsersHttpRepository } from './repositories/users.http.repository';
import { UsersLocalRepository } from './repositories/users.local.repository';
import { USERS_REPOSITORY } from './users.token';

/**
 * Returns a provider for the UsersRepository.
 * @param options Options for the provider.
 * @param options.useLocal Whether to use the local repository instead of the HTTP repository.
 * @returns A provider for the UsersRepository.
 * @example
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideUsersRepository, provideApiUrl } from '@fakestore/data';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideApiUrl('https://fakestoreapi.com'),
 *     provideUsersRepository({ useLocal: environment.useMockData }),
 *   ],
 * };
 * ```
 */
export function provideUsersRepository(options = { useLocal: false }) {
  return options.useLocal
    ? { provide: USERS_REPOSITORY, useClass: UsersLocalRepository }
    : { provide: USERS_REPOSITORY, useClass: UsersHttpRepository };
}
