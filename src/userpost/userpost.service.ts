import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPost } from '../entities/userpost.entity';
import { CreatePostDto } from 'src/dto/createPostDto';

@Injectable()
export class UserPostService {
  constructor(
    @InjectRepository(UserPost) private readonly postRepo: Repository<UserPost>,
  ) {}

  async createPost(post: CreatePostDto): Promise<UserPost> {
    const newPost = await this.postRepo.save(post);
    return newPost;
  }

  async editPost(postId: number, updatedDetails: Partial<UserPost>) {
    const existingPost = await this.findPostById(postId);
    if (!existingPost) {
      return Error("Post with this id doesn't exists");
    }
    existingPost.text = updatedDetails.text || existingPost.text;
    existingPost.likes = updatedDetails.likes || existingPost.likes;
    return await this.postRepo.save(existingPost);
  }

  async deletePost(postId: number): Promise<void> {
    const post = await this.findPostById(postId);
    if (!post) {
      throw Error("Post with this id doesn't exists");
    }
    await this.postRepo.delete(postId);
  }

  async findPostById(postId: number): Promise<UserPost> {
    return await this.postRepo.findOne({ where: { id: postId } });
  }

  async findPostsByUsername(username: string): Promise<UserPost[]> {
    const posts = await this.postRepo.find({
      where: { username },
      order: {createdAt: "DESC"}
    });
    return posts;
  }

  async countLikes(postId: number): Promise<number> {
    const post = await this.findPostById(postId);
    if (!post) {
      throw Error("Post with this id doesn't exists");
    }
    return post.likes.length;
  }
}
