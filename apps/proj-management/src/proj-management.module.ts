import { Module } from '@nestjs/common';
import { ProjManagementService } from './proj-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../../../config/mongo.config';
import { Board, BoardSchema } from './schemas/board.schema';
import { Task, TaskSchema } from './schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.projManagement.connection),
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [],
  providers: [ProjManagementService],
})
export class ProjManagementModule {}
