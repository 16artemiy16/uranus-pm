import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResCreate, ResGetAll, UsersFacadeService } from 'common/users-communicator';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersFacade: UsersFacadeService) {}

  @Get()
  getAll(): Observable<ResGetAll> {
    return this.usersFacade.getAll();
  }

  @Post()
  create(@Body() dto: any): Observable<ResCreate> {
    return this.usersFacade.create(dto);
  }
}
