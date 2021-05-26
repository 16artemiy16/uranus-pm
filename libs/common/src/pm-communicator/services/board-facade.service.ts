import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PM_SERVICE } from 'common/pm-communicator/constants';
import { ClientProxy } from '@nestjs/microservices';
import { BoardMsg } from 'common/pm-communicator';

interface RequestOptionsI {
  filter: Record<string, any>;
  projection: Record<string, any>;
}

@Injectable()
export class BoardFacadeService implements OnApplicationBootstrap {
  constructor(
    @Inject(PM_SERVICE) private readonly pmClient: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    await this.pmClient.connect();
  }

  get(filter: Record<string, any> = {}, projection: Record<string, any> = {}) {
    return this.pmClient.send(BoardMsg.Get, { filter, projection });
  }

  getByOwner(ownerId: string, projection: Record<string, any> = {}) {
    const filter = { ownerId };
    return this.pmClient.send(BoardMsg.Get, { filter, projection });
  }

  create(userId, dto) {
    return this.pmClient.send(BoardMsg.Create, { userId, dto });
  }
}
