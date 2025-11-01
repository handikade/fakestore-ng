/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { UsersRepository } from './users.repository';

const MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    username: 'johndoe',
    password: 'password123',
    name: {
      firstname: 'John',
      lastname: 'Doe',
    },
    address: {
      city: 'Anytown',
      street: '123 Main St',
      number: 123,
      zipcode: '12345',
      geolocation: {
        lat: '34.0522',
        long: '-118.2437',
      },
    },
    phone: '123-456-7890',
  },
  {
    id: 2,
    email: 'jane.doe@example.com',
    username: 'janedoe',
    password: 'password456',
    name: {
      firstname: 'Jane',
      lastname: 'Doe',
    },
    address: {
      city: 'Othertown',
      street: '456 Oak Ave',
      number: 456,
      zipcode: '67890',
      geolocation: {
        lat: '34.0523',
        long: '-118.2438',
      },
    },
    phone: '098-765-4321',
  },
];

/**
 * The local implementation of the UsersRepository.
 * This is used for testing or local development.
 * @see UsersRepository
 * @see UsersHttpRepository
 */
@Injectable()
export class UsersLocalRepository implements UsersRepository {
  getAll(): Promise<User[] | null> {
    return Promise.resolve(MOCK_USERS);
  }

  getById(id: number): Promise<User | null> {
    const user = MOCK_USERS.find((u) => u.id === id) ?? null;
    return Promise.resolve(user);
  }
}
