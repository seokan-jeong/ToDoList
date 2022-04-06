import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListStatus } from './list-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @Column()
  status: ListStatus;

  @ManyToOne((type) => User, (user) => user.lists, { eager: false })
  user: User;
}
