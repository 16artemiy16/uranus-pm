import { Controller } from '@nestjs/common';
import { PmService } from '../services/pm.service';
import { MessagePattern } from '@nestjs/microservices';
import { BoardMsg } from 'common/pm-communicator';
import { BoardsService } from '../services/boards.service';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly pmService: PmService,
    private readonly boardsService: BoardsService
  ) {}

  @MessagePattern(BoardMsg.Get)
  get(data: { filter: Record<string, any>, projection: Record<string, any> }) {
    const { filter, projection } = data;
    return this.boardsService.get(filter, projection);
  }

  @MessagePattern(BoardMsg.Create)
  create(data: { userId, dto: any }) {
    const { userId, dto } = data;
    return this.boardsService.create(userId, dto);
  }
}
