import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { UsersMsg } from 'common/users-communicator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UsersMsg.GetAll)
  getAll() {
    return this.usersService.getAll();
  }

  @MessagePattern(UsersMsg.Create)
  create(data: any) {
    return this.usersService.create(data);
  }
}
