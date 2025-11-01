import { AUTH_REPOSITORY } from './auth.token';
import { AuthHttpRepository } from './repositories/auth.http.repository';
import { AuthLocalRepository } from './repositories/auth.local.repository';

export function provideAuthRepository(options = { useLocal: false }) {
  return options.useLocal
    ? { provide: AUTH_REPOSITORY, useClass: AuthLocalRepository }
    : { provide: AUTH_REPOSITORY, useClass: AuthHttpRepository };
}
