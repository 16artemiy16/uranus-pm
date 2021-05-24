import { Controller } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { MessagePattern } from '@nestjs/microservices';
import { ReqLogin, UsersMsg } from 'common/users-communicator';
import { AuthService } from '../services/auth.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @MessagePattern(UsersMsg.GetAll)
  getAll() {
    return this.usersService.getAll();
  }

  @MessagePattern(UsersMsg.Create)
  create(data: any) {
    return this.usersService.create(data);
  }

  @MessagePattern(UsersMsg.Login)
  login({ email, password }: ReqLogin) {
    return this.authService.login(email, password);
  }

  @MessagePattern(UsersMsg.Verify)
  verify(token: string) {
    return this.authService.verify(token);
  }
}
