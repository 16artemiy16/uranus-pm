import { Controller } from '@nestjs/common';
import { AnalyticsService } from '../services/analytics.service';
import { MessagePattern } from '@nestjs/microservices';
import { AnalyticsMsg } from 'common/analytics-communicator/models/msg.model';
import {
  ReqGetUserFavouriteBoards,
  ReqGetUserFavouriteTasks,
  ReqTraceUserEvent
} from 'common/analytics-communicator/models/req.model';
import { ResGetUserFavouriteBoards, ResGetUserFavouriteTasks } from 'common/analytics-communicator/models/res.model';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @MessagePattern(AnalyticsMsg.Ping)
  ping(): string {
    return 'Analytics - pong';
  }

  @MessagePattern(AnalyticsMsg.TraceUserEvent)
  traceUserEvent(req: ReqTraceUserEvent): Promise<any> {
    const { user, action, data } = req;
    return this.analyticsService.traceUserEvent(user, action, data);
  }

  @MessagePattern(AnalyticsMsg.GetUserFavouriteBoards)
  getUserFavouriteBoards(req: ReqGetUserFavouriteBoards): Promise<ResGetUserFavouriteBoards> {
    const { user, limit } = req;
    return this.analyticsService.getUserFavouriteBoards(user, limit);
  }

  @MessagePattern(AnalyticsMsg.GetUserFavouriteTasks)
  getUserFavouriteTasks(req: ReqGetUserFavouriteTasks): Promise<ResGetUserFavouriteTasks> {
    const { user, limit } = req;
    return this.analyticsService.getUserFavouriteTasks(user, limit);
  }
}
