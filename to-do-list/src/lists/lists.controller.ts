import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  private logger = new Logger('ListsController');
  constructor(private listsService: ListsService) {}
  // to do list 만들기
  @Post()
  @UsePipes(ValidationPipe)
  createList(@Body() createListDto: CreateListDto): Promise<List> {
    this.logger.verbose(
      'creating a new list.' + 'Payload: ' + JSON.stringify(createListDto),
    );
    return this.listsService.createList(createListDto);
  }
  // to do list 가져오기

  // to do list 수정하기

  // to do list 삭제하기
}
