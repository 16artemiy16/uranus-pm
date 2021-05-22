import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersFacadeService } from 'common/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersFacade: UsersFacadeService,
  ) {}

  @Get()
  getHello(): any {
    return this.usersFacade.getAll();
  }
}
