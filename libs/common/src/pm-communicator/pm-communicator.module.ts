import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../../config/rabbit.config';
import { PM_SERVICE } from './constants';
import { PmCommunicatorFacadeService } from './services/pm-communicator-facade.service';
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
  providers: [PmCommunicatorFacadeService, BoardFacadeService],
  exports: [PmCommunicatorFacadeService, BoardFacadeService],
})
export class PmCommunicatorModule {}
