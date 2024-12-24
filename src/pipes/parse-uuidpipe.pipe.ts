import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ParseUUIDPipe implements PipeTransform {
  transform(value: string): string {

    if (!isUUID(value, '4')) {
      throw new BadRequestException(`El id "${value}" no tiene un formato válido de UUID`)
    }
    return value;
  }
}
