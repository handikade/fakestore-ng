import { AuthLoginPayload } from '../types/login-payload.type';
import { AuthLoginResponse } from '../types/login-response.type';

/**
 * Interface for the authentication repository.
 */
export interface AuthRepository {
  /**
   * Logs in a user.
   * @param payload The login payload.
   * @returns A promise that resolves with the login response or null if the login fails.
   */
  login(payload: AuthLoginPayload): Promise<AuthLoginResponse | null>;
}
