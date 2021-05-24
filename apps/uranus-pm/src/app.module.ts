import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { UsersCommunicatorModule } from 'common/users-communicator';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [UsersCommunicatorModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
