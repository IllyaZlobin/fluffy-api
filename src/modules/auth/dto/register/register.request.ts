import { User } from '../../../../core/typeorm';

export class RegisterRequest implements User {
  firstName: string;
  email: string;
  password: string;
  phone: string;
  countryId: number;
}
