import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BoardMsg } from 'common/pm-communicator/models/communication.model';
import { PmService } from '../services/pm.service';

@Controller()
export class PmController {
  constructor(
    private readonly pmService: PmService
  ) {}

  @MessagePattern(BoardMsg.GetAll)
  getAllBoards() {
    return this.pmService.getBoards();
  }

  @MessagePattern(BoardMsg.Create)
  createBoard(dto: any) {
    return this.pmService.createBoard(dto);
  }
}
