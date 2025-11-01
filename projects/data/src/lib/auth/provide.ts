import { AUTH_REPOSITORY } from './auth.token';
import { AuthHttpRepository } from './repositories/auth.http.repository';
import { AuthLocalRepository } from './repositories/auth.local.repository';

/**
 * Returns a provider for the AuthRepository.
 * @param options Options for the provider.
 * @param options.useLocal Whether to use the local repository instead of the HTTP repository.
 * @returns A provider for the AuthRepository.
 * @example
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideAuthRepository, provideApiUrl } from '@fakestore/data';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideApiUrl('https://fakestoreapi.com'),
 *     provideAuthRepository({ useLocal: environment.useMockData }),
 *   ],
 * };
 * ```
 */
export function provideAuthRepository(options = { useLocal: false }) {
  return options.useLocal
    ? { provide: AUTH_REPOSITORY, useClass: AuthLocalRepository }
    : { provide: AUTH_REPOSITORY, useClass: AuthHttpRepository };
}
