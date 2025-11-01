/**
 * Represents a user.
 */
export type User = {
  /**
   * The user ID.
   */
  id: number;
  /**
   * The user's email address.
   */
  email: string;
  /**
   * The user's username.
   */
  username: string;
  /**
   * The user's password.
   */
  password: string;
  /**
   * The user's name.
   */
  name: {
    /**
     * The user's first name.
     */
    firstname: string;
    /**
     * The user's last name.
     */
    lastname: string;
  };
  /**
   * The user's address.
   */
  address: {
    /**
     * The city of the address.
     */
    city: string;
    /**
     * The street of the address.
     */
    street: string;
    /**
     * The street number of the address.
     */
    number: number;
    /**
     * The zipcode of the address.
     */
    zipcode: string;
    /**
     * The geolocation of the address.
     */
    geolocation: {
      /**
       * The latitude.
       */
      lat: string;
      /**
       * The longitude.
       */
      long: string;
    };
  };
  /**
   * The user's phone number.
   */
  phone: string;
};
