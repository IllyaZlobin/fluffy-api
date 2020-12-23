import { Gender, Roles } from '../enums';
import { BaseEntity } from './baseEntity';
import { Country } from './country.model';
import { UserSession } from './userSession.model';

export interface User extends BaseEntity {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Roles;
  gender?: Gender;
  phone?: string;
  photo?: string;
  zipCode?: string;
  address?: string;
  country?: Country;
  sessions?: UserSession[];
}
