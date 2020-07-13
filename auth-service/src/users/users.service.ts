import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { SignUpCredentials } from './dto/sign-up.credentials';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async register(signUpCredentials: SignUpCredentials) {
    return this.userRepository.signUp(signUpCredentials);
  }

  async getUsers(getUsersFilterDto: GetUsersFilterDto) {
    return this.userRepository.getUsers(getUsersFilterDto);
  }

  async getUser(getUserFilterDto: GetUserFilterDto) {
    return this.userRepository.getUser(getUserFilterDto);
  }
}
