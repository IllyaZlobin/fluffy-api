import { User } from '../../../../core';

export class RegisterResponse {
  user: User;

  constructor(user?: User) {
    this.user = user;
  }
}
