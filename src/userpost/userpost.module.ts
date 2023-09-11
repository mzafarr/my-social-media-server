import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPost } from 'src/entities/userpost.entity';
import { UserPostController } from './userpost.controller';
import { UserPostService } from './userpost.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';
import { UserController } from 'src/user/user.controller';
// import { CorsModule } from '@nestjs/platform-express';
@Module({
  imports: [TypeOrmModule.forFeature([UserPost, User]) ],
  controllers: [UserPostController, UserController],
  providers: [UserService, UserPostService],
})
export class UserPostModule {}
