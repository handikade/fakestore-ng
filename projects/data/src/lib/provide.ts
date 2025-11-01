import { Provider } from '@angular/core';
import { API_URL } from './api.token';

/**
 * Returns a provider for the API_URL token.
 * @param url The base URL of the API.
 * @returns A provider for the API_URL token.
 * @example
 * ```typescript
 * import { ApplicationConfig } from '@angular/core';
 * import { provideApiUrl } from '@fakestore/data';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideApiUrl('https://fakestoreapi.com'),
 *   ],
 * };
 * ```
 */
export function provideApiUrl(url: string): Provider {
  return { provide: API_URL, useValue: url };
}
