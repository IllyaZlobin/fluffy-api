import { TokenType } from '../../enums';

export interface JwtPayload {
  id: number;
  email?: string;
  type: TokenType;
  iat: number;
  exp: number;
  iss: string;
}
