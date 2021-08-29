import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { UsersCommunicatorModule } from 'common/users-communicator';
import { UsersController } from './controllers/users.controller';
import { PmCommunicatorModule } from 'common/pm-communicator';
import { BoardsController } from './controllers/boards.controller';
import { AnalyticsCommunicatorModule } from 'common/analytics-communicator';
import { AnalyticsController } from './controllers/analytics.controller';

@Module({
  imports: [
    UsersCommunicatorModule,
    PmCommunicatorModule,
    AnalyticsCommunicatorModule,
  ],
  controllers: [
    AppController,
    UsersController,
    BoardsController,
    AnalyticsController
  ],
  providers: [AppService],
})
export class AppModule {}
