import { CreateBoardDto } from 'common/pm-communicator/dto/create-board.dto';
import { CreateTaskDto } from 'common/pm-communicator/dto/create-task.dto';

export type ReqGet = {
  filter?: Record<string, any>;
  projection?: Record<string, any>;
};

export type ReqAggregate = {
  aggregation: Record<string, any>[];
};

export type ReqCreate = {
  userId: string;
  dto: CreateBoardDto;
};

export type ReqGetColumns = {
  boardId: string;
};

export type ReqAggregateColumns = {
  aggregation: Record<string, any>[];
};

export type ReqCreateColumns = {
  boardId: string;
  columns: { name: string; order: number }[];
};

export type ReqCreateTask = {
  boardId: string;
  dto: CreateTaskDto;
};

export type ReqMoveTask = {
  taskId: string;
  toIndex: number;
  targetColumnId?: string;
};

export type ReqAssignTask = {
  taskId: string;
  assignee: string;
};

export type ReqAddMembers = {
  boardId: string;
  members: string[];
};

export type ReqRemoveMembers = {
  boardId: string;
  members: string[];
};
