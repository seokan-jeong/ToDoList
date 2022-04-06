import { IsNotEmpty } from 'class-validator';

export class DeleteListDto {
  @IsNotEmpty()
  id: number[];
}
