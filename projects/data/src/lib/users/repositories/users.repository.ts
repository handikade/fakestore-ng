import { User } from '../types/user.type';

/**
 * Interface for the users repository.
 */
export interface UsersRepository {
  /**
   * Gets all users.
   * @returns A promise that resolves with an array of users or null if the request fails.
   */
  getAll(): Promise<User[] | null>;

  /**
   * Gets a single user by their ID.
   * @param id The user ID.
   * @returns A promise that resolves with the user or null if the user is not found or the request fails.
   */
  getById(id: number): Promise<User | null>;

  /**
   *
   * @param payload
   * @returns
   */
  get(payload: { offset: number; limit: number }): Promise<User[] | null>;
}
