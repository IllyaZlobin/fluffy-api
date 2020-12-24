import { Gender, Roles } from 'src/core';

export class RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Roles;
  gender: Gender;
  phone: string;
  zipCode: string;
  address: string;
  country: number;
}
