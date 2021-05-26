import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BoardFacadeService } from 'common/pm-communicator/services/board-facade.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsFacade: BoardFacadeService
  ) {}

  @Get(':ownerId')
  get(@Param('ownerId') ownerId: string) {
    return this.boardsFacade.get({ ownerId });
  }

  @UseGuards(AuthGuard)
  @Post()
  createBoard(@Body() dto: any, @User('_id') userId: string) {
    return this.boardsFacade.create(userId, dto);
  }
}
