import { Controller } from '@nestjs/common';
import { AnalyticsService } from '../services/analytics.service';
import { MessagePattern } from '@nestjs/microservices';
import { AnalyticsMsg } from 'common/analytics-communicator/models/msg.model';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @MessagePattern(AnalyticsMsg.Ping)
  ping(): string {
    return 'Analytics - pong';
  }
}
