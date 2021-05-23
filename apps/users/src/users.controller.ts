import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('get_all')
  getAll() {
    return this.usersService.getAll();
  }

  @MessagePattern('create')
  create(data: any) {
    return this.usersService.create(data);
  }
}
