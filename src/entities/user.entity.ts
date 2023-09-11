import { Entity, Column, OneToMany, BeforeInsert, PrimaryColumn } from 'typeorm';
import { UserPost } from './userpost.entity';
import * as bcrypt from 'bcrypt'
@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserPost, (post) => post.username)
  posts: UserPost[];

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // @BeforeInsert()
  // async hashPasword() {
  //   // this.password = await bcrypt.hash(this.password, 10);
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(this.password, salt, (err, hash) => {
  //       if (err) {
  //         console.log('PASSWORD NOT HASHING')
  //       } else {
  //         this.password = hash
  //       }
  //     });
  //   });
  // }
}
