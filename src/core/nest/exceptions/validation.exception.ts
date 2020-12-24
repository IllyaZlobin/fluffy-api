import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from '../interfaces';

export class ValidationException extends HttpException {
  errors: ValidationError[];

  constructor(error: ValidationError);

  constructor(errors: ValidationError[]);

  constructor(message: string, property?: string[]);

  constructor(
    errorsOrMessage: ValidationError | ValidationError[] | string,
    property: string[] = [],
  ) {
    super('The model is not valid', HttpStatus.BAD_REQUEST);

    if (Array.isArray(errorsOrMessage)) {
      this.errors = errorsOrMessage;
    } else if (typeof errorsOrMessage === 'string') {
      this.errors = [{ message: errorsOrMessage, property }];
    } else {
      this.errors = [errorsOrMessage];
    }
  }
}
