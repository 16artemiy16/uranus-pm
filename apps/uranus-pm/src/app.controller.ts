import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersFacadeService } from 'common/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersFacade: UsersFacadeService,
  ) {}

  @Get()
  getAll(): any {
    return this.usersFacade.getAll();
  }

  @Post()
  create(@Body() dto: any): any {
    return this.usersFacade.create(dto);
  }
}
