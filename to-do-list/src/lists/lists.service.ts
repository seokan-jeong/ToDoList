import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { ListStatus } from './list-status.enum';

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
  async deleteList(id: number): Promise<void> {
    const result = await this.listRepository
      .createQueryBuilder()
      .delete()
      .from(List)
      .where('id = :id', { id: id })
      .execute();

    if (result.affected == 0) {
      throw new NotFoundException("Can't find list with id " + id);
    }

    console.log('result', result);
  }
}
