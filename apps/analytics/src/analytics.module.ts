import { Module } from '@nestjs/common';
import { AnalyticsController } from './controllers/analytics.controller';
import { AnalyticsService } from './services/analytics.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../../../config/mongo.config';
import { UserAction, UserActionSchema } from './schemas/user-action.schema';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.analytics.connection),
    MongooseModule.forFeature([{
      name: UserAction.name, schema: UserActionSchema
    }])
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
