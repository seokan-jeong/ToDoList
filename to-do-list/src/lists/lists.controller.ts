import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post, Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateListDto } from './dto/create-list.dto';
import { List } from './list.entity';
import { ListsService } from './lists.service';
import { ListStatusValidationPipe } from './pipes/list-status-validation.pipe';
import { ListStatus } from './list-status.enum';
import { DeleteListDto } from "./dto/delete-list.dto";

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
  @Get()
  getAllLists(): Promise<List[]> {
    this.logger.verbose('trying to get all boards');
    return this.listsService.getAllLists();
  }

  // to do list 수정하기
  @Put(':id/status')
  updateListStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ListStatusValidationPipe) status: ListStatus,
  ): Promise<List> {
    return this.listsService.updateListStatus(id, status);
  }

  // to do list 삭제하기
  @Delete()
  deleteList(@Body() deleteListDto: DeleteListDto): Promise<void> {
    this.logger.verbose(
      'deleting list.' + 'Payload: ' + JSON.stringify(deleteListDto),
    );
    return this.listsService.deleteList(deleteListDto);
  }
}
