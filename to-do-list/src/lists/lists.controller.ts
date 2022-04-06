import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './list.entity';
import { ListsService } from './lists.service';
import { ListStatusValidationPipe } from './pipes/list-status-validation.pipe';
import { ListStatus } from './list-status.enum';
import { DeleteListDto } from './dto/delete-list.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('lists')
@UseGuards(AuthGuard())
export class ListsController {
  private logger = new Logger('ListsController');
  constructor(private listsService: ListsService) {}
  // to do list 만들기
  @Post()
  @UsePipes(ValidationPipe)
  createList(
    @Body() createListDto: CreateListDto,
    @GetUser() user: User,
  ): Promise<List> {
    this.logger.verbose(
      'creating a new list.' + 'Payload: ' + JSON.stringify(createListDto),
    );
    return this.listsService.createList(createListDto, user);
  }
  // to do list 가져오기
  @Get()
  getAllLists(@GetUser() user: User): Promise<List[]> {
    this.logger.verbose('User ' + user.username + 'trying to get all boards');
    return this.listsService.getAllLists(user);
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
  deleteList(
    @Body() deleteListDto: DeleteListDto,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      'deleting list.' + 'Payload: ' + JSON.stringify(deleteListDto),
    );
    return this.listsService.deleteList(deleteListDto, user);
  }
}
