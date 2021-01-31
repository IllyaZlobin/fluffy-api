import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendlyHttpException extends HttpException {
  property: string[];
  friendlyStatus: HttpStatus;
  constructor(friendlyStatus: HttpStatus, message, property?: string[]) {
    super(message, HttpStatus.OK);
    this.property = property || [];
    this.friendlyStatus = friendlyStatus;
  }
}
