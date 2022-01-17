import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import { User } from './users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const { email, password } = createUserDto;

    const user = new User();
    user.email = email;
    user.password = password;

    await user.save();
    return user;
  }
}
