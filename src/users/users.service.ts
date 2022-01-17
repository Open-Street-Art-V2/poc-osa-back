import { CreateUserDTO } from './dto/create-user-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  public async getUserByLogin(email: string): Promise<User> {
    const findUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return findUser;
  }

  public async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    return await this.usersRepository.createUser(createUserDTO);
  }
}
