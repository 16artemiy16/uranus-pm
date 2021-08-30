import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AnalyticsFacadeService } from 'common/analytics-communicator/services/analytics-facade.service';
import { TraceUserEventDto } from 'common/analytics-communicator/dto/trace-user-event.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { switchMap } from 'rxjs/operators';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsFacade: AnalyticsFacadeService
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
    return this.analyticsFacade.getUserFavouriteBoards(userId, limit || 5);
  }
}
