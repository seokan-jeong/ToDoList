import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ListStatus } from '../list-status.enum';

export class ListStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [ListStatus.CHECKED, ListStatus.NOT_CHECKED];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(value + " isn't in the status options");
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
