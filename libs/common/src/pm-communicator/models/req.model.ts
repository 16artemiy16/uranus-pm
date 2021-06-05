import { CreateBoardDto } from 'common/pm-communicator/dto/create-board.dto';

export type ReqGet = {
  filter?: Record<string, any>;
  projection?: Record<string, any>;
};

export type ReqCreate = {
  userId: string;
  dto: CreateBoardDto;
};