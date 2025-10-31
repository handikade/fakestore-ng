import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiError } from '../../core/api-error';
import { err, ok, Result } from '../../core/result';
import { LoginRequest, LoginResponse } from '../domain/auth.models';
import { AuthRepository } from '../domain/auth.repository';
import { toLoginResponse } from './auth.mapper';
import { AuthRemoteDataSource } from './auth.remote-datasource';
import { TOKEN_STORAGE } from './token-storage.port';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl implements AuthRepository {
  private readonly remote = inject(AuthRemoteDataSource);
  private readonly storage = inject(TOKEN_STORAGE);

  async login(req: LoginRequest): Promise<Result<LoginResponse, ApiError>> {
    try {
      const dto = await firstValueFrom(this.remote.login(req.username, req.password));
      const res = toLoginResponse(dto);
      this.storage.set(res.token);
      return ok(res);
    } catch (e: any) {
      const ae: ApiError = {
        status: e?.status,
        message: e?.error?.message ?? e?.message ?? 'Login failed',
        details: e?.error,
      };
      return err(ae);
    }
  }

  async logout(): Promise<void> {
    this.storage.clear();
  }

  getToken(): string | null {
    return this.storage.get();
  }
}
