export type AuthToken = string;

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: AuthToken;
};
