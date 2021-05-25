import { Module } from '@nestjs/common';
import { UsersFacadeService } from './services/users-facade.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../../config/rabbit.config';
import { USERS_SERVICE } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.RMQ,
        options: rabbitConfig.users.options,
      },
    ]),
  ],
  providers: [UsersFacadeService],
  exports: [UsersFacadeService],
})
export class UsersCommunicatorModule {}
