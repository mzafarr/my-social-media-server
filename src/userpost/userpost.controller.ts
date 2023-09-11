import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserPostService } from './userpost.service';
import { CreatePostDto } from 'src/dto/createPostDto';
import { UserPost } from 'src/entities/userpost.entity';

@Controller('post')
export class UserPostController {
  constructor(private readonly UserPostService: UserPostService) {}
  @Post('create')
  async create(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return await this.UserPostService.createPost(createPostDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedDetails: Partial<UserPost>) {
    return await this.UserPostService.editPost(id, updatedDetails);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.UserPostService.deletePost(id);
    return { message: 'Post deleted successfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.UserPostService.findPostById(id);
  }

  @Get('user/:username')
  async findByUser(@Param('username') username: string) {
    return await this.UserPostService.findPostsByUsername(username);
  }
  @Get('likes/:id')
  async countLikes(@Param('id') id: number) {
    const likeCount = await this.UserPostService.countLikes(id);
    return { likes: likeCount };
  }
}
