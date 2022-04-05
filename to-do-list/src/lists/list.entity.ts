import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ListStatus } from './list-status.enum';

@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @Column()
  status: ListStatus;
}
