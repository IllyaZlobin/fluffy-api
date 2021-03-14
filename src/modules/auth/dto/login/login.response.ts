import { UserEntity } from 'src/core';

export class LoginResponse {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
  idToken: string;

  constructor(
    user: UserEntity,
    accessToken?: string,
    refreshToken?: string,
    idToken?: string,
  ) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.idToken = idToken;
  }
}
