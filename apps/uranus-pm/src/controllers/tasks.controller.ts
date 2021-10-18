import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { BoardFacadeService } from 'common/pm-communicator/services/board-facade.service';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { TaskI } from 'common/pm-communicator/models/entities/task.interface';
import { map, tap } from 'rxjs/operators';
import { MoveTaskDto } from 'common/pm-communicator/dto/move-task.dto';
import { AssignTaskDto } from 'common/pm-communicator/dto/assign-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly boardsFacade: BoardFacadeService
  ) {}

  @Get(':code')
  getTaskById(@Param('code') code: string): Observable<TaskI> {
    const [boardRaw, numberStr, ...rest] = code.split('-');
    const number = +numberStr;
    const board = boardRaw.toUpperCase();

    if (rest.length || isNaN(number)) {
      throw new BadRequestException('taskCodeIncorrectFormat');
    }

    return this.boardsFacade.getColumns(board).pipe(
      map((columns) => {
        let task = null;
        columns.some(({ tasks }) => {
          const foundTask = tasks.find((item) => item.number === number);
          if (foundTask) {
            task = foundTask;
            return;
          }
        });

        return task;
      }),
      tap((task) => {
        if (!task) {
          throw new NotFoundException('taskWithTheCodeDoesNotExist')
        }
      })
    );
  }

  @Put(':taskId/move')
  moveTask(
    @Param('taskId') taskId: string,
    @Body() dto: MoveTaskDto,
  ): Observable<boolean> {
    const { toIndex, targetColumnId } = dto;
    return this.boardsFacade.moveTask(taskId, toIndex, targetColumnId);
  }

  @Post(':taskId/assignee')
  assignTask(
    @Param('taskId') taskId: string,
    @Body() dto: AssignTaskDto,
  ): Observable<boolean> {
    const { assignee } = dto;
    return this.boardsFacade.assignTask(taskId, assignee);
  }
}
