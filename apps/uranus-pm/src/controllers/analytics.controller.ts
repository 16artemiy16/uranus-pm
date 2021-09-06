import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AnalyticsFacadeService } from 'common/analytics-communicator/services/analytics-facade.service';
import { TraceUserEventDto } from 'common/analytics-communicator/dto/trace-user-event.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { map, switchMap } from 'rxjs/operators';
import { BoardFacadeService } from 'common/pm-communicator/services/board-facade.service';
import { Types } from 'mongoose';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsFacade: AnalyticsFacadeService,
    private readonly boardsFacade: BoardFacadeService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('my-event')
  traceEvent(@Body() dto: TraceUserEventDto, @User('_id') userId: string) {
    const { action, data } = dto;
    return this.analyticsFacade.traceUserEvent(userId, action, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user/favourite/boards')
  getUserFavouriteBoards(@Query('limit') limit: number, @User('_id') userId: string) {
    return this.analyticsFacade.getUserFavouriteBoards(userId, limit || 5).pipe(
      switchMap((boardsStats) => {
        const boardsIds = boardsStats.map(({ board }) => Types.ObjectId(board));
        return this.boardsFacade.get({ _id: { $in: boardsIds } }, { name: 1 }).pipe(
          map((boards) => ({ boards, boardsStats }))
        )
      }),
      map(({ boards, boardsStats }) => {
        return boardsStats.map((stats) => {
          const board = boards.find(({ _id }) => _id.toString() === stats.board);
          return { ...board };
        });
      }),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user/favourite/tasks')
  getUserFavouriteTasks(@Query('limit') limit: number, @User('_id') userId: string) {
    return this.analyticsFacade.getUserFavouriteTasks(userId, limit || 5).pipe(
      switchMap((tasksStats) => {
        const tasksIds = tasksStats.map(({ task }) => task);

        return this.boardsFacade.aggregateColumns([
          { $unwind: '$tasks' },
          { $project: {
            _id: { $toString: '$tasks._id'}, title: '$tasks.title', boardId: '$tasks.boardId'
          } },
          { $match: { _id: { $in: tasksIds } } }
        ]).pipe(
          map((tasks) => ({ tasksStats, tasks }))
        )
      }),
      map(({ tasksStats, tasks }) => {
        return tasksStats.map((stats) => {
          const task = tasks.find(({ _id }) => _id === stats.task);
          return { ...task };
        });
      })
    );
  }
}
