import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendlyHttpException extends HttpException {
  property: string[];
  constructor(status: HttpStatus, message, property?: string[]) {
    super(message, HttpStatus.OK);
    this.property = property || [];
  }
}
