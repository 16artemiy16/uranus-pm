import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PmCommunicatorFacadeService } from 'common/pm-communicator';
import { BoardFacadeService } from 'common/pm-communicator/services/board-facade.service';

@Controller('pm')
export class PmController {
  constructor(
    private readonly pmFacade: PmCommunicatorFacadeService,
    private readonly boardsFacade: BoardFacadeService
  ) {}

  @Get('boards/:ownerId')
  get(@Param('ownerId') ownerId: string) {
    return this.boardsFacade.get({ ownerId });
  }

  @Post('boards')
  createBoard(@Body() dto: any) {
    return this.pmFacade.createBoard(dto);
  }
}
