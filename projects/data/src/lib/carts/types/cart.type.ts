/**
 * Represents a product in a cart.
 */
export type CartProduct = {
  /**
   * The product ID.
   */
  productId: number;
  /**
   * The quantity of the product.
   */
  quantity: number;
};

/**
 * Represents a cart.
 */
export type Cart = {
  /**
   * The cart ID.
   */
  id: number;
  /**
   * The user ID.
   */
  userId: number;
  /**
   * The date of the cart.
   */
  date: string;
  /**
   * The products in the cart.
   */
  products: CartProduct[];
};
