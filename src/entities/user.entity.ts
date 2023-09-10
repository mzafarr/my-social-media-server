import { Entity, Column, Index, OneToMany, EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(User)
export class User extends Repository<User>{
  @Column({ nullable: false, unique: true, length: 30 })
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
