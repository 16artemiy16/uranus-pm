import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersFacadeService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.usersClient.connect();
  }

  getAll() {
    return this.usersClient.send('get_all', '');
  }
}
