import { InjectionToken } from '@angular/core';
import { ProductsRepository } from './repositories/products.repository';

/**
 * Injection token for the ProductsRepository.
 * @see provideProductsRepository
 */
export const PRODUCTS_REPOSITORY = new InjectionToken<ProductsRepository>('PRODUCTS_REPOSITORY');
