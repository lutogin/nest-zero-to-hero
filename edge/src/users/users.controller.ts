import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body()
    body,
  ) {
    return this.usersService.signUp(body);
  }

  @Post('/signin')
  async signIn(
    @Body()
      body,
  ) {
    return this.usersService.signIn(body);
  }
}
