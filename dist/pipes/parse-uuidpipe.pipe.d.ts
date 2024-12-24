import { PipeTransform } from '@nestjs/common';
export declare class ParseUUIDPipe implements PipeTransform {
    transform(value: string): string;
}
