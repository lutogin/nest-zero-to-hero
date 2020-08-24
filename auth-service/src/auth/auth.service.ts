import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentials } from './dto/auth.credentials';
import { UserRepository } from '../users/user.repository';
import { AccessToken } from './interfaces/access-token.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  private logger = new Logger('auth.service');

  async makeToken({ id, email, role }) {
    const payload: JwtPayload = { id, email, role };

    return this.jwtService.signAsync(payload);
  }

  async signUp(authCredentials: AuthCredentials): Promise<any> {
    const signUpUser = await this.userRepository.signUp(authCredentials);
    this.logger.verbose(`User ${authCredentials.email} signUp`)
    return {
      signUpUser,
      accessToken: await this.makeToken(signUpUser),
    }
  }

  async signIn(authCredentials: AuthCredentials): Promise<AccessToken> {
    const user = await this.userRepository.getUserByCredentials(authCredentials);

    if(!user) {
      this.logger.error(`User ${authCredentials.email} invalid credentials.`);
      throw new UnauthorizedException('Invalid credentials.');
    }
    this.logger.verbose(`User ${authCredentials.email} signIn.`);
    return {
      accessToken: await this.makeToken(user),
    }
  }
}
