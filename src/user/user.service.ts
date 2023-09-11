import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/createUserDto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { username, email } = createUserDto;

    try {
      if (
        (await this.findUserByUsername(username) !== null) ||
        (await this.findUserByEmail(email) !== null)
      ) {
        throw new ConflictException('Username or email already in use.');
      }
      const user = await this.userRepo.create(createUserDto);
      return await this.userRepo.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(username: string, password: string) {
    const user = await this.findUserByUsername(username);
    if (user === null) {
      throw new Error('This username is not registered.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    //implement jwt
    return user;
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return await this.userRepo.findOne({
      where: { username },
    });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepo.findOne({
      where: { email },
    });
  }
}
