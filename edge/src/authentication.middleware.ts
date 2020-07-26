import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { get } from 'lodash';
import { AUTH_SERVICE_URL } from '../config/module.config';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): void {
    const authorizationToken = get(req, 'headers.authorization', '');

    axios
      .post(`${AUTH_SERVICE_URL}/auth/gu`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizationToken,
        }
      })
      .then(({data}) => {
        req.user = data;
        next();
      })
      .catch((err) => {
        return res.status(err.response.status).send(err.response.data)
      })
  }
}
