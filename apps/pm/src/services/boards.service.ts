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
import { BoardUserRoleEnum } from 'common/pm-communicator/models/entities/board-user-role.enum';
import { BoardUserStatusEnum } from 'common/pm-communicator/models/entities/board-user-status.enum';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>
  ) {}

  async get(filter: Record<string, any> = {}, projection: Record<string, any> = {}): Promise<BoardI[]> {
    return await this.boardModel.find(filter, projection).lean() as BoardI[];
  }

  aggregate(aggregation: Record<string, any>[]): Promise<any> {
    return this.boardModel.aggregate(aggregation).exec();
  }

  async create(userId: string, dto: CreateBoardDto): Promise<BoardDocument> {
    const { key, ...restDto } = dto;

    const isKeyFree = await this.boardModel.count({ _id: key }).lean().exec()
      .then((count) => count === 0);

    if (!isKeyFree) {
      throw new RpcException({
        statusCode: 400,
        message: 'boardKeyIsOccupied',
      });
    }

    const members = [{ userId, role: BoardUserRoleEnum.Admin, status: BoardUserStatusEnum.Active }];

    const board = new this.boardModel({ ...restDto, members, _id: key, ownerId: userId });
    const savedBoard = await board.save();

    const SCRUM_COLUMNS = [
      { name: 'Todo', order: 0 },
      { name: 'In Progress', order: 1 },
      { name: 'Review', order: 2 },
      { name: 'Done', order: 3 },
    ];

    await this.createColumns(savedBoard._id, SCRUM_COLUMNS);

    return savedBoard;
  }

  async getColumns(boardId: string): Promise<ColumnI[]> {
    return await this.columnModel
      .find({ boardId })
      .lean() as ColumnI[];
  }

  async aggregateColumns(aggregation: Record<string, any>[]): Promise<any> {
    return await this.columnModel.aggregate(aggregation).exec();
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

    const number = await this.columnModel.aggregate([
      { $match: { boardId } },
      { $unwind: '$tasks' },
      { $project: { _id: 0, tasks: 1 } },
      { $project: { number: '$tasks.number' } },
      { $sort: { number: -1 } },
      { $limit: 1 }
    ]).exec().then(([item]) => (item?.number || 0) + 1);

    const newTask = { ...dto, boardId, number, _id: `${boardId}-${number}` };

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

  async assignTask(taskId: string, assignee: string): Promise<boolean> {
    await this.columnModel
      .updateOne(
        { 'tasks._id': taskId },
        { $set: { 'tasks.$.assignee': assignee } }
        )
      .lean()
      .exec();

    return true;
  }

  async addMembers(boardId: string, members: string[]): Promise<boolean> {
    const doesBoardExist = await this.boardModel.find({ _id: boardId }).count().lean().exec();
    if (!doesBoardExist) {
      throw new RpcException({
        statusCode: 404,
        message: 'boardDoesNotExist',
      });
    }

    await this.boardModel.updateOne(
      { _id: boardId },
      {
        $addToSet: {
          members: members.map((userId) => ({
            userId,
            role: BoardUserRoleEnum.User,
            status: BoardUserStatusEnum.Invited
          }))
        }
      }
    );

    return true;
  }

  async removeMembers(boardId: string, members: string[]): Promise<boolean> {
    const board = await this.boardModel.findOne({ _id: boardId }).exec();

    if (!board) {
      throw new RpcException({
        statusCode: 404,
        message: 'boardDoesNotExist',
      });
    }

    const memberIdsForRemoving = board.members
      .map(({ userId }) => userId)
      .filter((userId) => members.includes(userId));

    board.members = board.members.filter((member) => !memberIdsForRemoving.includes(member.userId));
    await board.save();

    return true;
  }
}
