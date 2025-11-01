/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Product } from '../types/product.type';
import { ProductsRepository } from './products.repository';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: { rate: 4.1, count: 259 },
  },
];

/**
 * The local implementation of the ProductsRepository.
 * This is used for testing or local development.
 * @see ProductsRepository
 * @see ProductsHttpRepository
 */
@Injectable()
export class ProductsLocalRepository implements ProductsRepository {
  getAll(): Promise<Product[] | null> {
    return Promise.resolve(MOCK_PRODUCTS);
  }

  getById(id: number): Promise<Product | null> {
    const product = MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
    return Promise.resolve(product);
  }

  getAllCategories(): Promise<string[] | null> {
    const categories = [...new Set(MOCK_PRODUCTS.map((p) => p.category))];
    return Promise.resolve(categories);
  }

  getByCategory(category: string): Promise<Product[] | null> {
    const products = MOCK_PRODUCTS.filter((p) => p.category === category);
    return Promise.resolve(products);
  }
}
