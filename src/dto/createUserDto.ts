import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @Length(4, 30)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
