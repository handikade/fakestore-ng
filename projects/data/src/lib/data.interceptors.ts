import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TOKEN_STORAGE } from './auth/infra/token-storage.port';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(TOKEN_STORAGE);
  const token = storage.get();

  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq);
};
