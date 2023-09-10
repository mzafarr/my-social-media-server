import {
  Column,
  EntityRepository,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@EntityRepository()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: [] })
  likes: number[];

  @Column()
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
