import { Gender } from '../enums';
import { Advert } from './advert.model';
import { BaseEntity } from './baseEntity';
import { Gallery } from './gallery.model';
import { User } from './user.model';

export interface Pet extends BaseEntity {
  name?: string;
  birthday?: Date;
  photo?: string;
  gender?: Gender;
  breed?: string;
  color?: string;
  description?: string;
  type?: string;
  isLost?: boolean;
  user?: User;
  gallery?: Gallery[];
  adverts?: Advert[];
}
