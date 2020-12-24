import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendlyHttpException extends HttpException {
  property: string[];
  constructor(message, property?: string[]) {
    super(message, HttpStatus.OK);
    this.property = property || [];
  }
}
