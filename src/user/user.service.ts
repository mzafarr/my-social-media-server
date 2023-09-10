import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signUp(user: User): Promise<User> {
    const { username, email, password } = user;

    try {
      if (
        (await this.findUserByUsername(username)) ||
        (await this.findUserByEmail(email))
      ) {
        throw new ConflictException('Username or email already in use.');
      }
      const hash = await bcrypt.hash(password, 10);

      return await this.userRepo.create(user);
    } catch (error) {
      console.log(error);
      //   throw new InternalServerErrorException('User registration failed.'); check what does it do
    }
  }

  async signIn(username: string, password: string) {
    const user = await this.findUserByUsername(username);
    if (!user) {
      throw new ConflictException('This username or email is not registered.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //implement jwt
    return user;
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return await this.userRepo.findOne({
      where: [{ username }],
    });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({
      where: [{ email }],
    });
  }
}
