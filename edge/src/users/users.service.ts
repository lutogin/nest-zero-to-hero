import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { AUTH_SERVICE_URL } from '../../config/module.config';

@Injectable()
export class UsersService {
  private authClient: AxiosInstance;

  constructor() {
    this.authClient = axios.create({
      baseURL: AUTH_SERVICE_URL,
    });
  }

  async signUp(data): Promise<void> {
    const { data: response } = await this.authClient.post('/auth/signup', data);

    return response;
  }

  async signIn(data): Promise<void> {
    const { data: response } = await this.authClient.post('/auth/signin', data);

    return response;
  }
}
