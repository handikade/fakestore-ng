import { InjectionToken } from '@angular/core';

export interface TokenStorage {
  get(): string | null;
  set(token: string): void;
  clear(): void;
}

export const TOKEN_STORAGE = new InjectionToken<TokenStorage>('TOKEN_STORAGE');
