import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiError } from '../../core/api-error';
import { err, ok, Result } from '../../core/result';
import { User, UserId } from '../domain/user.models';
import { UsersRepository } from '../domain/users.repository';
import { toUser, toUsers } from './users.mapper';
import { UsersRemoteDataSource } from './users.remote-datasource';

@Injectable({ providedIn: 'root' })
export class UsersRepositoryImpl implements UsersRepository {
  private readonly remote = inject(UsersRemoteDataSource);

  async list(): Promise<Result<User[], ApiError>> {
    try {
      const dto = await firstValueFrom(this.remote.list());
      return ok(toUsers(dto));
    } catch (e: any) {
      return err({ status: e?.status, message: 'Failed to load users', details: e?.error });
    }
  }

  async getById(id: UserId): Promise<Result<User, ApiError>> {
    try {
      const dto = await firstValueFrom(this.remote.getById(id));
      return ok(toUser(dto));
    } catch (e: any) {
      return err({ status: e?.status, message: `Failed to load user ${id}`, details: e?.error });
    }
  }
}
