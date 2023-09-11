import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/createUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.signUp(createUserDto);
  }

  @Post('signin')
  async signIn(@Body(new ValidationPipe()) requestBody: { username: string; password: string }) {
    const { password, ...result } = await this.userService.signIn(
      requestBody.username,
      requestBody.password,
    );
    return result;
  }
}
