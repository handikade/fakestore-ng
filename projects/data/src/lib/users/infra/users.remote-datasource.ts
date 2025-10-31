import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../data.tokens';
import { UserDto } from './users.dto';

@Injectable({ providedIn: 'root' })
export class UsersRemoteDataSource {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  list() {
    return this.http.get<UserDto[]>(`${this.baseUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<UserDto>(`${this.baseUrl}/users/${id}`);
  }
}
