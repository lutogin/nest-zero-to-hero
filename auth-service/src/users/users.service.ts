import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { AuthCredentials } from '../auth/dto/auth.credentials';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async signUp(authCredentials: AuthCredentials) {
    return this.userRepository.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentials) {
    const userName = await this.userRepository.getUserByCredentials(authCredentials);

    if(!userName) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    return userName;
  }

  async getUsers(getUsersFilterDto: GetUsersFilterDto) {
    return this.userRepository.getUsers(getUsersFilterDto);
  }

  async getUser(getUserFilterDto: GetUserFilterDto) {
    return this.userRepository.getUser(getUserFilterDto);
  }
}
