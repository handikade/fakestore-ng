import { User } from '../domain/user.models';
import { UserDto } from './users.dto';

export const toUser = (dto: UserDto): User => ({
  id: dto.id,
  email: dto.email,
  username: dto.username,
  name: { firstname: dto.name.firstname, lastname: dto.name.lastname },
  phone: dto.phone,
  address: {
    city: dto.address.city,
    street: dto.address.street,
    number: dto.address.number,
    zipcode: dto.address.zipcode,
  },
});

export const toUsers = (dtos: UserDto[]): User[] => dtos.map(toUser);
