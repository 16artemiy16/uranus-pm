import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BoardFacadeService } from 'common/pm-communicator/services/board-facade.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { CreateBoardDto } from 'common/pm-communicator/dto/create-board.dto';
import { BoardI } from 'common/pm-communicator/models/entities/board.interface';
import { Observable } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsFacade: BoardFacadeService
  ) {}

  @Get('owner/:ownerId')
  getByOwner(@Param('ownerId') ownerId: string): Observable<BoardI[]> {
    return this.boardsFacade.get({ ownerId });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createBoard(@Body() dto: CreateBoardDto, @User('_id') userId: string): Observable<BoardI> {
    return this.boardsFacade.create(userId, dto);
  }
}
