import { PRODUCTS_REPOSITORY } from './products.token';
import { ProductsHttpRepository } from './repositories/products.http.repository';
import { ProductsLocalRepository } from './repositories/products.local.repository';

/**
 * Returns a provider for the ProductsRepository.
 * @param options Options for the provider.
 * @param options.useLocal Whether to use the local repository instead of the HTTP repository.
 * @returns A provider for the ProductsRepository.
 * @example
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideProductsRepository, provideApiUrl } from '@fakestore/data';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideApiUrl('https://fakestoreapi.com'),
 *     provideProductsRepository({ useLocal: environment.useMockData }),
 *   ],
 * };
 * ```
 */
export function provideProductsRepository(options = { useLocal: false }) {
  return options.useLocal
    ? { provide: PRODUCTS_REPOSITORY, useClass: ProductsLocalRepository }
    : { provide: PRODUCTS_REPOSITORY, useClass: ProductsHttpRepository };
}
