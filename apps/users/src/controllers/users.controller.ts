import { Controller } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { MessagePattern } from '@nestjs/microservices';
import { UsersMsg } from 'common/users-communicator/models/msg.model';
import { AuthService } from '../services/auth.service';
import { UserI } from 'common/users-communicator/models/entities/user.interface';
import { CreateUserDto } from 'common/users-communicator/dto/create-user.dto';
import { JwtUserType } from 'common/users-communicator/models/entities/jwt-user.type';
import { QueryOptions } from 'mongoose';
import { NotificationI } from 'common/users-communicator/models/entities/notification.interface';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @MessagePattern(UsersMsg.Ping)
  ping(): string {
    return 'Users - pong';
  }

  @MessagePattern(UsersMsg.GetAll)
  getAll(data: { query?: any, projection?: any, options?: QueryOptions }): Promise<UserI[]> {
    const { query, projection, options } = data;
    return this.usersService.getAll(query, projection, options);
  }

  @MessagePattern(UsersMsg.Create)
  create(data: CreateUserDto): Promise<boolean> {
    return this.usersService.create(data);
  }

  @MessagePattern(UsersMsg.Login)
  login({ email, password }: { email: string, password: string }): Promise<string> {
    return this.authService.login(email, password);
  }

  @MessagePattern(UsersMsg.Verify)
  verify(token: string): Promise<JwtUserType> {
    return this.authService.verify(token);
  }

  @MessagePattern(UsersMsg.EmailIsFree)
  emailIsFree(email: string): Promise<boolean> {
    return this.authService.isEmailFree(email);
  }

  @MessagePattern(UsersMsg.FavouriteToggleBoard)
  toggleFavouriteBoard(req: { boardId: string, userId: string }): Promise<boolean> {
    const { boardId, userId } = req;
    return this.usersService.toggleFavouriteBoard(boardId, userId);
  }

  @MessagePattern(UsersMsg.Notify)
  notifyUser(req: { userId: string, text: string, type:  string }): Promise<boolean> {
    const { userId, text, type } = req;
    return this.usersService.notifyUser(userId, text, type);
  }

  @MessagePattern(UsersMsg.NotificationsToggleRead)
  notificationsToggleRead(req: { ids: string[], isRead: boolean }): Promise<boolean> {
    const { ids, isRead } = req;
    return this.usersService.notificationsToggleRead(ids, isRead);
  }

  @MessagePattern(UsersMsg.GetNotifications)
  getUserNotifications(req: { userId: string }): Promise<NotificationI[]> {
    const { userId } = req;
    return this.usersService.getUserNotifications(userId);
  }
}
