import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_SERVICE } from './constants';
import { ReqCreate, ResCreate, ResGetAll, UsersMsg } from './communication.model';
import { Observable } from 'rxjs';

@Injectable()
export class UsersFacadeService implements OnApplicationBootstrap {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.usersClient.connect();
  }

  getAll(): Observable<ResGetAll> {
    return this.usersClient.send<ResGetAll, ''>(UsersMsg.GetAll, '');
  }

  create(data: ReqCreate): Observable<ResCreate> {
    return this.usersClient.send<ResCreate, ReqCreate>(UsersMsg.Create, data);
  }
}
