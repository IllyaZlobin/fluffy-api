import { AdvertStatus } from '../enums';
import { BaseEntity } from './baseEntity';
import { LocationModel } from './location.model';
import { Pet } from './pet.model';
import { User } from './user.model';

export interface Advert extends BaseEntity {
  title?: string;
  description?: string;
  status?: AdvertStatus;
  address?: string;
  location?: LocationModel;
  user?: User;
  pet?: Pet;
}
