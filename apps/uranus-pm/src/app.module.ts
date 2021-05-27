import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { UsersCommunicatorModule } from 'common/users-communicator';
import { UsersController } from './controllers/users.controller';
import { PmCommunicatorModule } from 'common/pm-communicator';
import { BoardsController } from './controllers/boards.controller';

@Module({
  imports: [UsersCommunicatorModule, PmCommunicatorModule],
  controllers: [
    AppController,
    UsersController,
    BoardsController
  ],
  providers: [AppService],
})
export class AppModule {}
