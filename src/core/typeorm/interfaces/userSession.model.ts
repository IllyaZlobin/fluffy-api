import { BaseEntity } from './baseEntity';
import { User } from './user.model';

export interface UserSession extends BaseEntity {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  remoteAddress?: string;
}
