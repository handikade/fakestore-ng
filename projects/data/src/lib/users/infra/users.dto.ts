export type UserDto = {
  id: number;
  email: string;
  username: string;
  name: { firstname: string; lastname: string };
  phone: string;
  address: { city: string; street: string; number: number; zipcode: string };
};
