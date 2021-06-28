import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PM_SERVICE } from 'common/pm-communicator/constants';
import { ClientProxy } from '@nestjs/microservices';
import { BoardMsg } from 'common/pm-communicator/models/msg.model';
import { Observable } from 'rxjs';
import { BoardI } from 'common/pm-communicator/models/entities/board.interface';
import { CreateBoardDto } from 'common/pm-communicator/dto/create-board.dto';
import { CreateTaskDto } from 'common/pm-communicator/dto/create-task.dto';
import { TaskI } from 'common/pm-communicator/models/entities/task.interface';

@Injectable()
export class BoardFacadeService implements OnApplicationBootstrap {
  constructor(
    @Inject(PM_SERVICE) private readonly pmClient: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    await this.pmClient.connect();
  }

  get(filter: Record<string, any> = {}, projection: Record<string, any> = {}): Observable<BoardI[]> {
    return this.pmClient.send(BoardMsg.Get, { filter, projection });
  }

  getByOwner(ownerId: string, projection: Record<string, any> = {}): Observable<BoardI[]> {
    const filter = { ownerId };
    return this.pmClient.send(BoardMsg.Get, { filter, projection });
  }

  create(userId: string, dto: CreateBoardDto): Observable<BoardI> {
    return this.pmClient.send(BoardMsg.Create, { userId, dto });
  }

  getColumns(boardId: string): Observable<any[]> {
    return this.pmClient.send(BoardMsg.GetColumns, { boardId });
  }

  createColumns(boardId: string, columns: { order: number; name: string }[]): Observable<boolean> {
    return this.pmClient.send(BoardMsg.CreateColumns, { boardId, columns });
  }

  createTask(boardId: string, dto: CreateTaskDto): Observable<boolean> {
    return this.pmClient.send(BoardMsg.CreateTask, { boardId, dto });
  }

  moveTask(taskId: string, toIndex: number, targetColumnId?: string): Observable<boolean> {
    return this.pmClient.send(BoardMsg.MoveTask, { taskId, toIndex, targetColumnId });
  }

  assignTask(taskId: string, assigneeId: string): Observable<boolean> {
    return this.pmClient.send(BoardMsg.AssignTask, { taskId, assigneeId });
  }

  addMembers(boardId: string, members: string[]): Observable<boolean> {
    return this.pmClient.send(BoardMsg.AddMembers, { boardId, members });
  }
}
