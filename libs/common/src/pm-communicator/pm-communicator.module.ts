import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../../config/rabbit.config';
import { PM_SERVICE } from './constants';
import { BoardFacadeService } from 'common/pm-communicator/services/board-facade.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PM_SERVICE,
        transport: Transport.RMQ,
        options: rabbitConfig.pm.options,
      },
    ]),
  ],
  providers: [BoardFacadeService],
  exports: [BoardFacadeService],
})
export class PmCommunicatorModule {}
