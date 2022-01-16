import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
