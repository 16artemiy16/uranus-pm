import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ANALYTICS_SERVICE } from 'common/analytics-communicator/constants';
import { ClientProxy } from '@nestjs/microservices';
import { AnalyticsMsg } from 'common/analytics-communicator/models/msg.model';
import { Observable } from 'rxjs';

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
}
