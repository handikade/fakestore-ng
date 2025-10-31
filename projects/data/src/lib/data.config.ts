import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { LocalTokenStorageService } from './auth/infra/token-storage.local';
import { TOKEN_STORAGE } from './auth/infra/token-storage.port';
import { authInterceptor } from './data.interceptors';
import { API_BASE_URL } from './data.tokens';

export type DataConfig = {
  apiBaseUrl: string;
};

export function provideData(config: DataConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: API_BASE_URL, useValue: config.apiBaseUrl },

    // Token storage implementation (can be swapped in tests)
    { provide: TOKEN_STORAGE, useClass: LocalTokenStorageService },

    // Functional HttpClient w/ interceptor chain
    provideHttpClient(withInterceptors([authInterceptor])),
  ]);
}
