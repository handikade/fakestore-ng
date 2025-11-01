import { AuthLoginPayload } from '../types/login-payload.type';
import { AuthLoginResponse } from '../types/login-response.type';

export interface AuthRepository {
  login(payload: AuthLoginPayload): Promise<AuthLoginResponse>;
}
