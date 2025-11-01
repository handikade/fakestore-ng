/**
 * Represents a product.
 */
export type Product = {
  /**
   * The product ID.
   */
  id: number;
  /**
   * The product title.
   */
  title: string;
  /**
   * The product price.
   */
  price: number;
  /**
   * The product description.
   */
  description: string;
  /**
   * The product category.
   */
  category: string;
  /**
   * The URL of the product image.
   */
  image: string;
  /**
   * The product rating.
   */
  rating: {
    /**
     * The rating value.
     */
    rate: number;
    /**
     * The number of ratings.
     */
    count: number;
  };
};
