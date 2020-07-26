import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TASK_MANAGEMENT_URL } from '../config/module.config';

@Injectable()
export class AppService {
  async getTasksList(): Promise<{[key: string]: string}> {
    const { data } = await axios.get(`${TASK_MANAGEMENT_URL}/tasks`);
    return data;
  }
}
