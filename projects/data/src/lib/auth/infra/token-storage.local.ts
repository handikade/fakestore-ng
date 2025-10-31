import { Injectable } from '@angular/core';
import { TokenStorage } from './token-storage.port';

const KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class LocalTokenStorageService implements TokenStorage {
  get(): string | null {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }
  set(token: string): void {
    try {
      localStorage.setItem(KEY, token);
    } catch {}
  }
  clear(): void {
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }
}
