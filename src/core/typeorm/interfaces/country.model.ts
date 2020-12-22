import { BaseEntity } from './baseEntity';
import { User } from './user.model';

export interface Country extends BaseEntity {
  name: string;
  users: User[];
}
