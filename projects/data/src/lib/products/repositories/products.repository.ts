import { Product } from '../types/product.type';

/**
 * Interface for the products repository.
 */
export interface ProductsRepository {
  /**
   * Gets all products.
   * @returns A promise that resolves with an array of products or null if the request fails.
   */
  getAll(): Promise<Product[] | null>;

  /**
   * Gets a single product by its ID.
   * @param id The product ID.
   * @returns A promise that resolves with the product or null if the product is not found or the request fails.
   */
  getById(id: number): Promise<Product | null>;

  /**
   * Gets all product categories.
   * @returns A promise that resolves with an array of categories or null if the request fails.
   */
  getAllCategories(): Promise<string[] | null>;

  /**
   * Gets all products in a specific category.
   * @param category The category name.
   * @returns A promise that resolves with an array of products or null if the request fails.
   */
  getByCategory(category: string): Promise<Product[] | null>;
}
