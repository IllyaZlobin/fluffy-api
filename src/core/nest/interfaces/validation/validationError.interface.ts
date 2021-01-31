import { HttpStatus } from "@nestjs/common";

export interface ValidationError {
  status?: HttpStatus;
  message: string;
  property: string[];
}
