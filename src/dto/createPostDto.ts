import {  IsString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
