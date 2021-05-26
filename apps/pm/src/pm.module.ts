import { Module } from '@nestjs/common';
import { PmService } from './services/pm.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../../../config/mongo.config';
import { Board, BoardSchema } from './schemas/board.schema';
import { Task, TaskSchema } from './schemas/task.schema';
import { PmController } from './controllers/pm.controller';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.pm.connection),
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [PmController],
  providers: [PmService],
})
export class PMModule {}
