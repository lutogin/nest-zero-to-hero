import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { PasswordService } from '../services/password-service';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { AuthCredentials } from '../auth/dto/auth.credentials';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private static DUPLICATE_ERROR_CODE = '23505';

  async signUp(authCredentials: AuthCredentials): Promise<any> {
    const { email, password, name } = authCredentials;

    const user = new User();
    user.email = email;
    user.passwordHash = await PasswordService.hash(password);
    user.name = name ? name : null;
    try {
      await user.save();
      const { passwordHash, ...userData } = user;
      return userData;
    } catch (err) {
      if (err.code === UserRepository.DUPLICATE_ERROR_CODE) {
        throw new ConflictException('Email already exists.')
      }

      throw new InternalServerErrorException(err);
    }
  }

  async getUserByCredentials(signUpCredentials: AuthCredentials): Promise<User> {
    const { email, password } = signUpCredentials;
    // const user = await User.findOne({ email });
    const user = await getRepository(User).findOne({email});
    if (user && await user.validatePassword(password)) {
      return user
    }

    return null;
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
