import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  contents: string;
}
