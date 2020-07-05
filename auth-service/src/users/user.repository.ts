import { EntityRepository, Repository } from 'typeorm';
import { PasswordService } from '../services/password-service';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { SignUpCredentials } from './dto/sign-up.credentials';
import { User } from './user.entity';
import { UserRole } from './user.role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpCredentials: SignUpCredentials): Promise<void> {
    const { email, password, role } = signUpCredentials;

    const user = new User();
    user.email = email;
    user.passwordHash = await PasswordService.hash(password);
    user.role = role || UserRole.USER;

    await user.save();
  }

  async getUsers(getUserFilter: GetUsersFilterDto): Promise<User[]> {
    const { email } = getUserFilter;
    const query = this.createQueryBuilder('task');

    if (email) {
      query.andWhere('user.email = :email', { email })
    }

    // if(search) {
    //   query.andWhere('(task.title LIKE :search OR task.description LIKE :search)' , { search: `%${search}%` })
    // }

    return query.getMany();
  }

  async getUser(getUserFilter: GetUserFilterDto): Promise<User> {
    const { email, id } = getUserFilter;
    const query = this.createQueryBuilder('task');

    if (email) {
      query.andWhere('user.email = :email', { email })
    }

    if (id) {
      query.andWhere('user.id = :id' , { id })
    }

    return query.getOne();
  }
}
