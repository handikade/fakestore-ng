import { Result } from '../../core/result';
import { LoginRequest, LoginResponse } from './auth.models';

export abstract class AuthRepository {
  abstract login(req: LoginRequest): Promise<Result<LoginResponse>>;
  abstract logout(): Promise<void>;
  abstract getToken(): string | null;
}
