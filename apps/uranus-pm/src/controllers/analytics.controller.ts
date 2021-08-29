import { Body, Controller, Post } from '@nestjs/common';
import { AnalyticsFacadeService } from 'common/analytics-communicator/services/analytics-facade.service';
import { TraceUserEventDto } from 'common/analytics-communicator/dto/trace-user-event.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsFacade: AnalyticsFacadeService
  ) {}

  @Post('trace-event')
  traceEvent(@Body() dto: TraceUserEventDto) {
    const { user, action } = dto;
    return this.analyticsFacade.traceUserEvent(user, action);
  }
}
