import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BoardsService } from '../services/boards.service';
import {
  ReqAddMembers,
  ReqAssignTask,
  ReqCreate,
  ReqCreateColumns,
  ReqCreateTask,
  ReqGet,
  ReqGetColumns,
  ReqMoveTask,
  ReqRemoveMembers,
} from 'common/pm-communicator/models/req.model';
import { ResCreate, ResGet } from 'common/pm-communicator/models/res.model';
import { BoardMsg } from 'common/pm-communicator/models/msg.model';
import { ColumnI } from 'common/pm-communicator/models/entities/column.interface';

@Controller()
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService
  ) {}

  @MessagePattern(BoardMsg.Ping)
  ping(): string {
    return 'PM - pong';
  }

  @MessagePattern(BoardMsg.Get)
  get(req: ReqGet): Promise<ResGet> {
    const { filter = {}, projection = {} } = req;
    return this.boardsService.get(filter, projection);
  }

  @MessagePattern(BoardMsg.Create)
  create(req: ReqCreate): Promise<ResCreate> {
    const { userId, dto } = req;
    return this.boardsService.create(userId, dto);
  }

  @MessagePattern(BoardMsg.GetColumns)
  getColumns(req: ReqGetColumns): Promise<ColumnI[]> {
    const { boardId } = req;
    return this.boardsService.getColumns(boardId);
  }

  @MessagePattern(BoardMsg.CreateColumns)
  createColumns(req: ReqCreateColumns): Promise<boolean> {
    const { boardId, columns } = req;
    return this.boardsService.createColumns(boardId, columns);
  }

  @MessagePattern(BoardMsg.CreateTask)
  createTask(req: ReqCreateTask): Promise<boolean> {
    const { boardId, dto } = req;
    return this.boardsService.createTask(boardId, dto);
  }

  @MessagePattern(BoardMsg.MoveTask)
  moveTask(req: ReqMoveTask): Promise<boolean> {
    const { taskId, toIndex, targetColumnId } = req;
    return this.boardsService.moveTask(taskId, toIndex, targetColumnId);
  }

  @MessagePattern(BoardMsg.AssignTask)
  assignTask(req: ReqAssignTask): Promise<boolean> {
    const { taskId, assignee } = req;
    return this.boardsService.assignTask(taskId, assignee);
  }

  @MessagePattern(BoardMsg.AddMembers)
  addMembers(req: ReqAddMembers): Promise<boolean> {
    const { boardId, members } = req;
    return this.boardsService.addMembers(boardId, members);
  }

  @MessagePattern(BoardMsg.RemoveMembers)
  removeMembers(req: ReqRemoveMembers): Promise<boolean> {
    const { boardId, members } = req;
    return this.boardsService.removeMembers(boardId, members);
  }
}
