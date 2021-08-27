import { Controller, Get } from '@nestjs/common';
import { AnalyticsFacadeService } from 'common/analytics-communicator/services/analytics-facade.service';
import { Observable } from 'rxjs';
import { UsersFacadeService } from 'common/users-communicator';
import { BoardFacadeService } from 'common/pm-communicator/services/board-facade.service';

@Controller()
export class AppController {
  constructor(
    private readonly analyticsFacade: AnalyticsFacadeService,
    private readonly usersFacade: UsersFacadeService,
    private readonly boardsFacade: BoardFacadeService,
  ) {}

  @Get('ping/analytics')
  pingAnalytics(): Observable<string> {
    return this.analyticsFacade.ping();
  }

  @Get('ping/pm')
  pingPM(): Observable<string> {
    return this.boardsFacade.ping();
  }

  @Get('ping/users')
  pingUsers(): Observable<string> {
    return this.usersFacade.ping();
  }
}
