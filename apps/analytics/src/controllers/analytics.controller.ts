import { Controller } from '@nestjs/common';
import { AnalyticsService } from '../services/analytics.service';
import { MessagePattern } from '@nestjs/microservices';
import { AnalyticsMsg } from 'common/analytics-communicator/models/msg.model';
import { TraceUserEventDto } from 'common/analytics-communicator/dto/trace-user-event.dto';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @MessagePattern(AnalyticsMsg.Ping)
  ping(): string {
    return 'Analytics - pong';
  }

  @MessagePattern(AnalyticsMsg.TraceUserEvent)
  traceUserEvent(event: TraceUserEventDto): Promise<any> {
    const { user, action } = event;
    return this.analyticsService.traceUserEvent(user, action);
  }
}
