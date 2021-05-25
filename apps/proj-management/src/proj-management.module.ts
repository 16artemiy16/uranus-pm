import { Module } from '@nestjs/common';
import { ProjManagementService } from './services/proj-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../../../config/mongo.config';
import { Board, BoardSchema } from './schemas/board.schema';
import { Task, TaskSchema } from './schemas/task.schema';
import { ProjManagementController } from './controllers/proj-management.controller';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.projManagement.connection),
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [ProjManagementController],
  providers: [ProjManagementService],
})
export class ProjManagementModule {}
