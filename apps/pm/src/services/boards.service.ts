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
import { transferItem } from 'common/utils/array.utils';

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

  async moveTask(taskId: string, toIndex: number, targetColumnId?: string): Promise<boolean> {
    const column = await this.columnModel
      .findOne({ 'tasks._id': taskId })

    if (!column) {
      throw new RpcException({
        statusCode: 404,
        message: 'noTaskWithThisId',
      });
    }

    const task = column.tasks.find((item) => item._id.toString() === taskId);

    if (targetColumnId) {
      const targetColumn = await this.columnModel.findById(targetColumnId);
      const taskToReplace = targetColumn.tasks[toIndex];

      if (taskToReplace) {
        targetColumn.tasks.splice(toIndex, 1, task, targetColumn.tasks[toIndex]);
      } else {
        targetColumn.tasks.splice(toIndex, 1, task);
      }

      column.tasks = column.tasks.filter((item) => item._id.toString() !== taskId);

      await Promise.all([targetColumn.save(), column.save()]);
    } else {
      const taskIndex = column.tasks.findIndex((item) => item._id.toString() === taskId);
      column.tasks = transferItem(column.tasks, taskIndex, toIndex);
      await column.save();
    }

    return true;
  }
}
