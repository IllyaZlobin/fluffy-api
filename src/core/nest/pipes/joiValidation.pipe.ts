import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';
import { JoiRegisteredSchemas, ValidationError } from '../interfaces';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schemas: JoiRegisteredSchemas) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, metadata: ArgumentMetadata): any {
    const validationSchemaKey = metadata.metatype?.name;
    if (!validationSchemaKey || !this.schemas[validationSchemaKey]) {
      return value;
    }

    const validationResult = this.schemas[validationSchemaKey].validate(value, {
      abortEarly: false,
    });

    if (!validationResult.error) {
      return validationResult.value;
    }

    const errors: ValidationError[] = validationResult.error.details.map(
      error => ({
        message: error.message,
        property: error.path.map(i => i.toString()),
      }),
    );

    throw new ValidationException(errors);
  }
}
