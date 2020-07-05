import { Body, Controller, Get } from '@nestjs/common';
import { SignUpCredentials } from '../users/dto/sign-up.credentials';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService
  ) {}

  @Get('/signup')
  async signUp(
    @Body() signUpCredentials: SignUpCredentials
  ) {
    return this.usersService.signUp(signUpCredentials);
  }
}
