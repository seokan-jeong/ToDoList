import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { ListStatus } from './list-status.enum';
import { DeleteListDto } from './dto/delete-list.dto';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  // to do list 만들기
  async createList(createListDto: CreateListDto): Promise<List> {
    const { contents } = createListDto;

    const list = this.listRepository.create({
      contents: contents,
      status: ListStatus.NOT_CHECKED,
    });

    await this.listRepository.save(list);
    return list;
  }

  // to do list 가져오기
  async getAllLists(): Promise<List[]> {
    const query = this.listRepository.createQueryBuilder('list');
    const lists = await query.getMany();
    return lists;
  }

  async getListById(id: number): Promise<List> {
    const found = await this.listRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new NotFoundException("Can't find Board with id " + id);
    }

    return found;
  }

  // to do list 수정하기
  async updateListStatus(id: number, status: ListStatus): Promise<List> {
    const list = await this.getListById(id);

    list.status = status;

    await this.listRepository.save(list);
    return list;
  }

  // to do list 삭제하기
  async deleteList(deleteListDto: DeleteListDto): Promise<void> {
    const ids = deleteListDto.id;

    await this.listRepository.delete(ids);
  }
}
