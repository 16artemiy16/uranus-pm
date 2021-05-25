import { Body, Controller, Get, Post } from '@nestjs/common';
import { PmCommunicatorFacadeService } from 'common/pm-communicator';

@Controller('pm')
export class PmController {
  constructor(
    private readonly pmFacade: PmCommunicatorFacadeService
  ) {}

  @Get('boards')
  getAllBoards() {
    return this.pmFacade.getAllBoards();
  }

  @Post('boards')
  createBoard(@Body() dto: any) {
    return this.pmFacade.createBoard(dto);
  }
}
