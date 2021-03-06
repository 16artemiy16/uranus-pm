import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_SERVICE } from '../constants';
import { Observable } from 'rxjs';
import { UserI } from 'common/users-communicator/models/entities/user.interface';
import { CreateUserDto } from 'common/users-communicator/dto/create-user.dto';
import { UsersMsg } from 'common/users-communicator/models/msg.model';
import { JwtUserType } from 'common/users-communicator/models/entities/jwt-user.type';
import { QueryOptions } from 'mongoose';
import { catchError, tap } from 'rxjs/operators';
import { NotificationI } from 'common/users-communicator/models/entities/notification.interface';

@Injectable()
export class UsersFacadeService implements OnApplicationBootstrap {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.usersClient.connect();
  }

  ping(): Observable<string> {
    return this.usersClient.send(UsersMsg.Ping, '');
  }

  getAll(query: any, projection: any = {}, options: QueryOptions = {}): Observable<UserI[]> {
    return this.usersClient.send(UsersMsg.GetAll, { query, projection, options });
  }

  create(data: CreateUserDto): Observable<boolean> {
    return this.usersClient.send(UsersMsg.Create, data);
  }

  login(email: string, password: string): Observable<string | null> {
    return this.usersClient.send(UsersMsg.Login, { email, password });
  }
  
  verify(token: string): Observable<JwtUserType | null> {
    return this.usersClient.send(UsersMsg.Verify, token);
  }

  emailIsFree(email: string): Observable<boolean> {
    return this.usersClient.send(UsersMsg.EmailIsFree, email);
  }

  boardToggleFavourite(boardId: string, userId: string): Observable<boolean> {
    return this.usersClient.send(UsersMsg.FavouriteToggleBoard, { boardId, userId });
  }

  notify(userId: string, text: string, type: string): Observable<boolean> {
    return this.usersClient.send(UsersMsg.Notify, { userId, text, type });
  }

  toggleNotificationsRead(ids: string[], isRead: boolean): Observable<boolean> {
    return this.usersClient.send(UsersMsg.NotificationsToggleRead, { ids, isRead });
  }

  getUserNotifications(userId: string): Observable<NotificationI[]> {
    return this.usersClient.send(UsersMsg.GetNotifications, { userId });
  }
}
