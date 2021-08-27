import { Module } from '@nestjs/common';
import { AnalyticsFacadeService } from 'common/analytics-communicator/services/analytics-facade.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../../config/rabbit.config';
import { ANALYTICS_SERVICE } from 'common/analytics-communicator/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ANALYTICS_SERVICE,
        transport: Transport.RMQ,
        options: rabbitConfig.analytics.options,
      },
    ]),
  ],
  providers: [AnalyticsFacadeService],
  exports: [AnalyticsFacadeService],
})
export class AnalyticsCommunicatorModule {}
