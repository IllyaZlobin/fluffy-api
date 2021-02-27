import { Advert } from './advert.model';
import { BaseEntity } from './baseEntity';

export interface LocationModel extends BaseEntity {
  latitude?: string;
  longitude?: string;
  adverts?: Advert[];
}
