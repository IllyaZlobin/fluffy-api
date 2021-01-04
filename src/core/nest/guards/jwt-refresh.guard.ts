import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ValidationException } from '../exceptions';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { query } = context.switchToHttp().getRequest();
    if (query.refreshToken) {
      return true;
    } else {
      throw new ValidationException('Refresh token didn`t passed', [
        'refreshToken',
      ]);
    }
  }
}
