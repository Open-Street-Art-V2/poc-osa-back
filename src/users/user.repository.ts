import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const { email, password } = createUserDto;

    const user = new User();
    user.email = email;
    user.password = password;

    await user.save();
    return user;
  }
}
