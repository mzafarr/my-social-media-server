// UserModule
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPostService } from 'src/userpost/userpost.service';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserPostController } from 'src/userpost/userpost.controller';
import { UserPostModule } from 'src/userpost/userpost.module'; // Import UserPostModule here
import { UserPost } from 'src/entities/userpost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPost])], // Include UserPostModule in the imports
  controllers: [UserController, UserPostController],
  providers: [UserService, UserPostService],
})
export class UserModule {}
