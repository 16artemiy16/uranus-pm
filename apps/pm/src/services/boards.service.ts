import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from '../schemas/board.schema';
import { Model } from 'mongoose';
import { BoardI } from 'common/pm-communicator/models/entities/board.interface';
import { CreateBoardDto } from 'common/pm-communicator/dto/create-board.dto';
import { Column, ColumnDocument } from '../schemas/column.schema';
import { Task, TaskDocument } from '../schemas/task.schema';
import { ColumnI } from 'common/pm-communicator/models/entities/column.interface';
import { CreateTaskDto } from 'common/pm-communicator/dto/create-task.dto';
import { TaskI } from 'common/pm-communicator/models/entities/task.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>
  ) {}

  async get(filter: Record<string, any> = {}, projection: Record<string, any> = {}): Promise<BoardI[]> {
    return await this.boardModel.find(filter, projection).lean() as BoardI[];
  }

  create(userId: string, dto: CreateBoardDto): Promise<BoardDocument> {
    const board = new this.boardModel({ ...dto, ownerId: userId });
    return board.save();
  }

  async getColumns(boardId: string): Promise<ColumnI[]> {
    const columns = await this.columnModel
      .find({ boardId })
      .lean();
    const columnsIds = columns.map((col) => col._id.toString());

    const tasks = await this.taskModel
      .find({ columnId: { $in: columnsIds } })
      .lean();

    return columns.map((col) => {
      return {
        ...col,
        tasks: tasks.filter((task) => task.columnId === col._id.toString())
      }
    }) as ColumnI[];
  }

  async createColumns(boardId: string, columns: { name: string, order: number }[]): Promise<boolean> {
    const newColumns = columns.map(({ name, order }) => ({ name, order, boardId }));
    await this.columnModel.insertMany(newColumns);
    return true;
  }

  async createTask(boardId: string, dto: CreateTaskDto): Promise<TaskI> {
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

    const task = new this.taskModel({
      ...dto,
      boardId,
      columnId,
    });

    return (await task.save()) as TaskI;
  }
}
