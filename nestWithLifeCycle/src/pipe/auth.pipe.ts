import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata) {
    const integer = parseInt(value);
    if (isNaN(integer)) {
      throw new NotAcceptableException('無法解析為數字');
    }
    return integer;
  }
}
