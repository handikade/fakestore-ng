import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../data.tokens';
import { LoginDto } from './auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthRemoteDataSource {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  login(username: string, password: string) {
    // POST { username, password } -> { token }
    return this.http.post<LoginDto>(`${this.baseUrl}/auth/login`, { username, password });
  }
}
