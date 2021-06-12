import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BoardsService } from '../services/boards.service';
import { ReqCreate, ReqCreateColumns, ReqGet, ReqGetColumns } from 'common/pm-communicator/models/req.model';
import { ResCreate, ResGet } from 'common/pm-communicator/models/res.model';
import { BoardMsg } from 'common/pm-communicator/models/msg.model';
import { ColumnI } from 'common/pm-communicator/models/entities/column.interface';

@Controller()
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService
  ) {}

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
}
