import { Module } from '@nestjs/common';
import { UsersFacadeService } from 'common/common/users-communicator/users-facade.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../../config/rabbit.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: rabbitConfig.users.options,
      },
    ]),
  ],
  providers: [UsersFacadeService],
  exports: [UsersFacadeService],
})
export class UsersCommunicatorModule {}
