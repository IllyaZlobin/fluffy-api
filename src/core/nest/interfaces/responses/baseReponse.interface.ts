import { ValidationError } from '../validation';

export interface BaseResponse<T> {
  errors: ValidationError[];
  data: T;
}
