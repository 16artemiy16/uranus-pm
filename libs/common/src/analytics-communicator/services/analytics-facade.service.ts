import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ANALYTICS_SERVICE } from 'common/analytics-communicator/constants';
import { ClientProxy } from '@nestjs/microservices';
import { AnalyticsMsg } from 'common/analytics-communicator/models/msg.model';
import { Observable } from 'rxjs';
import { ResGetUserFavouriteBoards } from 'common/analytics-communicator/models/res.model';

@Injectable()
export class AnalyticsFacadeService implements OnApplicationBootstrap {
  constructor(
    @Inject(ANALYTICS_SERVICE) private readonly analyticsClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.analyticsClient.connect();
  }

  ping(): Observable<string> {
    return this.analyticsClient.send(AnalyticsMsg.Ping, '');
  }

  traceUserEvent(user: string, action: string, data?: any): Observable<any> {
    return this.analyticsClient.send(AnalyticsMsg.TraceUserEvent, { user, action, data });
  }

  getUserFavouriteBoards(user: string, limit?: number): Observable<ResGetUserFavouriteBoards> {
    return this.analyticsClient.send(AnalyticsMsg.GetUserFavouriteBoards, { user, limit });
  }
}
