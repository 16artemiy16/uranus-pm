import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_SERVICE } from './constants';
import { ReqCreate, ResCreate, ResGetAll, ResLogin, UsersMsg } from './communication.model';
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

  login(email: string, password: string): Observable<ResLogin> {
    return this.usersClient.send(UsersMsg.Login, { email, password });
  }
  
  verify(token: string): Observable<any> {
    return this.usersClient.send(UsersMsg.Verify, token);
  }
}
