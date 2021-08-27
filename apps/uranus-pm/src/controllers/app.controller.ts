import { Controller, Get } from '@nestjs/common';
import { AnalyticsFacadeService } from 'common/analytics-communicator/services/analytics-facade.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly analyticsFacade: AnalyticsFacadeService
  ) {}

  @Get('ping/analytics')
  pingAnalytics(): Observable<string> {
    return this.analyticsFacade.ping();
  }
}
