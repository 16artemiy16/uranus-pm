import { Module } from '@nestjs/common';
import { PmService } from './services/pm.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../../../config/mongo.config';
import { Board, BoardSchema } from './schemas/board.schema';
import { Task, TaskSchema } from './schemas/task.schema';
import { PmController } from './controllers/pm.controller';
import { BoardsController } from './controllers/boards.controller';
import { BoardsService } from './services/boards.service';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.pm.connection),
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [PmController, BoardsController],
  providers: [PmService, BoardsService],
})
export class PMModule {}
