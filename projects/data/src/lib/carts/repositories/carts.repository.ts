import { Cart } from '../types/cart.type';

/**
 * Interface for the carts repository.
 */
export interface CartsRepository {
  /**
   * Gets all carts.
   * @returns A promise that resolves with an array of carts or null if the request fails.
   */
  getAll(): Promise<Cart[] | null>;

  /**
   * Gets a single cart by its ID.
   * @param id The cart ID.
   * @returns A promise that resolves with the cart or null if the cart is not found or the request fails.
   */
  getById(id: number): Promise<Cart | null>;

  /**
   * Gets all carts for a specific user.
   * @param userId The user ID.
   * @returns A promise that resolves with an array of carts or null if the request fails.
   */
  getByUser(userId: number): Promise<Cart[] | null>;
}
