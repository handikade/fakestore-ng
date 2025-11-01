import { CARTS_REPOSITORY } from './carts.token';
import { CartsHttpRepository } from './repositories/carts.http.repository';
import { CartsLocalRepository } from './repositories/carts.local.repository';

/**
 * Returns a provider for the CartsRepository.
 * @param options Options for the provider.
 * @param options.useLocal Whether to use the local repository instead of the HTTP repository.
 * @returns A provider for the CartsRepository.
 * @example
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideCartsRepository, provideApiUrl } from '@fakestore/data';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideApiUrl('https://fakestoreapi.com'),
 *     provideCartsRepository({ useLocal: environment.useMockData }),
 *   ],
 * };
 * ```
 */
export function provideCartsRepository(options = { useLocal: false }) {
  return options.useLocal
    ? { provide: CARTS_REPOSITORY, useClass: CartsLocalRepository }
    : { provide: CARTS_REPOSITORY, useClass: CartsHttpRepository };
}
