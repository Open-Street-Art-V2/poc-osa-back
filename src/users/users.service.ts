import { CreateUserDTO } from './dto/create-user-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  public async getUserByLogin(email: string): Promise<User> {
    const findUser = await this.userRepository.findOne({
      where: { email },
    });

    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return findUser;
  }

  public async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    return await this.userRepository.createUser(createUserDTO);
  }
}
