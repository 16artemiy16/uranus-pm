import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BoardMsg } from 'common/pm-communicator/models/communication.model';
import { ProjManagementService } from '../services/proj-management.service';

@Controller()
export class ProjManagementController {
  constructor(
    private readonly pmService: ProjManagementService
  ) {}

  @MessagePattern(BoardMsg.GetAll)
  getAllBoards() {
    console.log('Gte_All_BOARDS contoller PM')
    return this.pmService.getBoards();
  }

  @MessagePattern(BoardMsg.Create)
  createBoard(dto: any) {
    return this.pmService.createBoard(dto);
  }
}
