import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../../../config/mongo.config';
import { Board, BoardSchema } from './schemas/board.schema';
import { BoardsController } from './controllers/boards.controller';
import { BoardsService } from './services/boards.service';
import { Column, ColumnSchema } from './schemas/column.schema';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.pm.connection),
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Column.name, schema: ColumnSchema },
    ]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class PMModule {}
