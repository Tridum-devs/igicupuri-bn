import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    return value;
  }
}
