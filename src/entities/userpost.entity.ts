import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserPost extends Repository<UserPost> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', { array: true, default: [] })
  likes: number[];

  @Column()
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  
  @Column()
  username: string;
}
