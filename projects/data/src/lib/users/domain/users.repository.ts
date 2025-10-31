import { Result } from '../../core/result';
import { User, UserId } from './user.models';

export abstract class UsersRepository {
  abstract list(): Promise<Result<User[]>>;
  abstract getById(id: UserId): Promise<Result<User>>;
}
