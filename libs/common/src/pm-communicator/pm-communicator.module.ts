import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../../config/rabbit.config';
import { PM_SERVICE } from './constants';
import { PmCommunicatorFacadeService } from './services/pm-communicator-facade.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PM_SERVICE,
        transport: Transport.RMQ,
        options: rabbitConfig.projManagement.options,
      },
    ]),
  ],
  providers: [PmCommunicatorFacadeService],
  exports: [PmCommunicatorFacadeService],
})
export class PmCommunicatorModule {}
