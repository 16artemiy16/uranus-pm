import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from '../schemas/board.schema';
import { Model } from 'mongoose';
import { BoardI } from 'common/pm-communicator/models/entities/board.interface';
import { CreateBoardDto } from 'common/pm-communicator/dto/create-board.dto';
import { Column, ColumnDocument } from '../schemas/column.schema';
import { ColumnI } from 'common/pm-communicator/models/entities/column.interface';
import { CreateTaskDto } from 'common/pm-communicator/dto/create-task.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>
  ) {}

  async get(filter: Record<string, any> = {}, projection: Record<string, any> = {}): Promise<BoardI[]> {
    return await this.boardModel.find(filter, projection).lean() as BoardI[];
  }

  create(userId: string, dto: CreateBoardDto): Promise<BoardDocument> {
    const board = new this.boardModel({ ...dto, ownerId: userId });
    return board.save();
  }

  async getColumns(boardId: string): Promise<ColumnI[]> {
    return await this.columnModel
      .find({ boardId })
      .lean() as ColumnI[];
  }

  async createColumns(boardId: string, columns: { name: string, order: number }[]): Promise<boolean> {
    const newColumns = columns.map(({ name, order }) => ({ name, order, boardId }));
    await this.columnModel.insertMany(newColumns);
    return true;
  }

  async createTask(boardId: string, dto: CreateTaskDto): Promise<boolean> {
    const columns = await this.columnModel
      .find({ boardId }, { _id: 1 })
      .sort({ order: 1 })
      .limit(1)
      .lean()
      .exec();

    const columnId = columns[0]?._id;

    if (!columnId) {
      throw new RpcException({
        statusCode: 400,
        message: 'boardHasNoColumns',
      });
    }

    const newTask = { ...dto, boardId };
    await this.columnModel.update({ _id: columnId }, { $push: { tasks: newTask } })

    return true;
  }
}
