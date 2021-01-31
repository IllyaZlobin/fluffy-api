import { TokenType } from '../../enums';

export interface JwtPayload {
  sub: string;
  email_verifies: boolean;
  iss: string;
  phone_number_verified: boolean;
  'cognito:username': string;
  aud: string;
  event_id: string;
  token_user: string;
  auth_time: string;
  phone_number: string;
  exp: string;
  iat: number;
  email: string;
}
