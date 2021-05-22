import { Module } from '@nestjs/common';
import { UsersFacadeService } from 'common/common/users-communicator/users-facade.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from '../../../../config/rabbit.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: config.users.options,
      },
    ]),
  ],
  providers: [UsersFacadeService],
  exports: [UsersFacadeService],
})
export class UsersCommunicatorModule {}
