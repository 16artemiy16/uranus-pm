import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { Board, BoardDocument } from '../schemas/board.schema';

@Injectable()
export class PmService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  createBoard(data: any): Promise<any> {
    const board = new this.boardModel(data);
    return board.save();
  }
}
