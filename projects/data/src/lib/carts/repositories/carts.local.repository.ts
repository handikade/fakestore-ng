/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Cart } from '../types/cart.type';
import { CartsRepository } from './carts.repository';

const MOCK_CARTS: Cart[] = [
  {
    id: 1,
    userId: 1,
    date: '2020-03-02T00:00:00.000Z',
    products: [
      { productId: 1, quantity: 4 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 6 },
    ],
  },
  {
    id: 2,
    userId: 1,
    date: '2020-01-02T00:00:00.000Z',
    products: [
      { productId: 2, quantity: 4 },
      { productId: 1, quantity: 10 },
      { productId: 5, quantity: 2 },
    ],
  },
  {
    id: 3,
    userId: 2,
    date: '2020-03-01T00:00:00.000Z',
    products: [
      { productId: 1, quantity: 2 },
      { productId: 9, quantity: 1 },
    ],
  },
];

/**
 * The local implementation of the CartsRepository.
 * This is used for testing or local development.
 * @see CartsRepository
 * @see CartsHttpRepository
 */
@Injectable()
export class CartsLocalRepository implements CartsRepository {
  getAll(): Promise<Cart[] | null> {
    return Promise.resolve(MOCK_CARTS);
  }

  getById(id: number): Promise<Cart | null> {
    const cart = MOCK_CARTS.find((c) => c.id === id) ?? null;
    return Promise.resolve(cart);
  }

  getByUser(userId: number): Promise<Cart[] | null> {
    const carts = MOCK_CARTS.filter((c) => c.userId === userId);
    return Promise.resolve(carts);
  }
}
