import { LoginResponse } from '../domain/auth.models';
import { LoginDto } from './auth.dto';

export const toLoginResponse = (dto: LoginDto): LoginResponse => ({
  token: dto.token,
});
