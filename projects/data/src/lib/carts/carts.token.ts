import { InjectionToken } from '@angular/core';
import { CartsRepository } from './repositories/carts.repository';

/**
 * Injection token for the CartsRepository.
 * @see provideCartsRepository
 */
export const CARTS_REPOSITORY = new InjectionToken<CartsRepository>('CARTS_REPOSITORY');
