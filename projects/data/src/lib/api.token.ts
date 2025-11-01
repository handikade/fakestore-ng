import { InjectionToken } from '@angular/core';

/**
 * Injection token for the API base URL.
 * @see provideApiUrl
 */
export const API_URL = new InjectionToken<string>('API_URL');
