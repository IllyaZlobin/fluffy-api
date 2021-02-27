import { Gender, Roles } from '../enums';
import { Advert } from './advert.model';
import { BaseEntity } from './baseEntity';
import { Country } from './country.model'
import { Pet } from './pet.model';

export interface User extends BaseEntity {
  firstName?: string;
  lastName?: string;
  email?: string;
  sub?: string;
  role?: Roles;
  gender?: Gender;
  phone?: string;
  photo?: string;
  zipCode?: string;
  address?: string;
  country?: Country;

  pets?: Pet[]
  adverts?: Advert[];
}
