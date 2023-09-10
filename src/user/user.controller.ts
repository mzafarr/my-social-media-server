import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() user: User): Promise<User> {
    return await this.userService.signUp(user);
  }

  @Post('signin')
  async signIn(@Body() username: string, @Body() password: string) {
    return await this.userService.signIn(username, password);
  }
}
