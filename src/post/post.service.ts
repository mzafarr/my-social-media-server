import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async createPost(post: Post): Promise<Post> {
    return await this.postRepo.save(post);
  }

  async editPost(postId: number, updatedDetails: Partial<Post>) {
    const existingPost = await this.findPostById(postId);
    if (!existingPost) {
      return Error("Post with this id doesn't exists");
    }
    existingPost.text = updatedDetails.text || existingPost.text;
    existingPost.likes = updatedDetails.likes || existingPost.likes;
    return await this.postRepo.save(existingPost);
  }

  async deletePost(postId: number) {
    const post = await this.findPostById(postId);
    if (!post) {
      throw Error("Post with this id doesn't exists");
    }
    await this.postRepo.delete(postId);
    // await this.postRepo.remove(post); which one is better delete or remove
    //what should i return in case of delete
  }

  async findPostById(postId: number) {
    return await this.postRepo.findOne({ where: { id: postId } });
  }

  async findPostsByUserId(username: string) {
    return await this.postRepo.find({ where: { user: username } });
  }

  async countLikes(postId: number): Promise<number> {
    const post = await this.findPostById(postId);
    if (!post) {
      throw Error("Post with this id doesn't exists");
    }
    return post.likes.length;
  }
}
