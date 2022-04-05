import { Injectable } from '@nestjs/common';
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

  // to do list 수정하기

  // to do list 삭제하기
}
