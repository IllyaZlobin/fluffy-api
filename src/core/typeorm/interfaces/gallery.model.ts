import { BaseEntity } from './baseEntity';
import { Pet } from './pet.model';

export interface Gallery extends BaseEntity {
  photoUrl?: string;
  pet?: Pet;
}
