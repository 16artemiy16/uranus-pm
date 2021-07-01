import { Body, Controller, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BoardFacadeService } from 'common/pm-communicator/services/board-facade.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { CreateBoardDto } from 'common/pm-communicator/dto/create-board.dto';
import { BoardI } from 'common/pm-communicator/models/entities/board.interface';
import { Observable } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ColumnI } from 'common/pm-communicator/models/entities/column.interface';
import { CreateColumnsDto } from 'common/pm-communicator/dto/create-columns.dto';
import { CreateTaskDto } from 'common/pm-communicator/dto/create-task.dto';
import { MoveTaskDto } from 'common/pm-communicator/dto/move-task.dto';
import { AddMembersDto } from 'common/pm-communicator/dto/add-members.dto';
import { UserI } from 'common/users-communicator/models/entities/user.interface';
import { map, switchMap, tap } from 'rxjs/operators';
import { UsersFacadeService } from 'common/users-communicator';
import { Types } from 'mongoose';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsFacade: BoardFacadeService,
    private readonly usersFacade: UsersFacadeService
  ) {}

  @Get('owner/:ownerId')
  getByOwner(@Param('ownerId') ownerId: string): Observable<BoardI[]> {
    return this.boardsFacade.getByOwner(ownerId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('my')
  getMy(@User('_id') userId: string): Observable<BoardI[]> {
    return this.boardsFacade.getByOwner(userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createBoard(@Body() dto: CreateBoardDto, @User('_id') userId: string): Observable<BoardI> {
    return this.boardsFacade.create(userId, dto);
  }

  @Get(':boardId/columns')
  getColumns(@Param('boardId') boardId: string): Observable<ColumnI[]> {
    return this.boardsFacade.getColumns(boardId);
  }

  @Post(':boardId/columns')
  createColumns(@Param('boardId') boardId: string, @Body() dto: CreateColumnsDto): Observable<boolean> {
    const { columns } = dto;
    return this.boardsFacade.createColumns(boardId, columns);
  }

  @Post(':boardId/task')
  createTask(@Param('boardId') boardId: string, @Body() dto: CreateTaskDto): Observable<boolean> {
    return this.boardsFacade.createTask(boardId, dto);
  }

  @Get(':boardId/members')
  getMembers(@Param('boardId') boardId: string): Observable<UserI[]> {
    return this.boardsFacade.get({ _id: boardId }).pipe(
      map((boards) => boards[0]),
      tap((board) => {
        if (!board) {
          throw new NotFoundException('boardDoesNotExist');
        }
      }),
      // TODO: refactor  creating UserFacade.aggregate() function
      switchMap((board) => {
        const membersIds = board.members.map((member) => Types.ObjectId(member.userId));
        return this.usersFacade
          .getAll({ _id: { $in: membersIds } })
          .pipe(
            map((users) => {
              return users.map((user) => {
                const { status, role } = board.members.find((item) => item.userId === user._id.toString());
                return { ...user, status, role };
              })
            })
          );
      })
    );
  }

  @Post(':boardId/members')
  addMembers(@Param('boardId') boardId: string, @Body() dto: AddMembersDto): Observable<boolean> {
    return this.boardsFacade.addMembers(boardId, dto.members);
  }

  @Put('task/:taskId/move')
  moveTask(
    @Param('taskId') taskId: string,
    @Body() dto: MoveTaskDto,
  ): Observable<boolean> {
    const { toIndex, targetColumnId } = dto;
    return this.boardsFacade.moveTask(taskId, toIndex, targetColumnId);
  }

  @Post('task/:taskId/assignee')
  assignTask(
    @Param('taskId') taskId: string,
    @Body('assigneeId') assigneeId: string
  ): Observable<boolean> {
    return this.boardsFacade.assignTask(taskId, assigneeId);
  }
}
