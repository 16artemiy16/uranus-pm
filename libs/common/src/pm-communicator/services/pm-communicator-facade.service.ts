import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PM_SERVICE } from 'common/pm-communicator/constants';
import { ClientProxy } from '@nestjs/microservices';
import { BoardMsg } from 'common/pm-communicator';

@Injectable()
export class PmCommunicatorFacadeService implements OnApplicationBootstrap {
  constructor(
    @Inject(PM_SERVICE) private readonly pmClient: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    await this.pmClient.connect();
  }

  getAllBoards() {
    return this.pmClient.send(BoardMsg.GetAll, '');
  }

  createBoard(data: any) {
    return this.pmClient.send(BoardMsg.Create, data);
  }
}
