import { Gender, Roles } from '../enums';
import { BaseEntity } from './baseEntity';
import { Country } from './country.model';

export interface User extends BaseEntity {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Roles;
  gender?: Gender;
  phone?: string;
  photo?: string;
  zipCode?: string;
  address?: string;
  country?: Country;
}
