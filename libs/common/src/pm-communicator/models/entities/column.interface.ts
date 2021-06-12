import { TaskI } from 'common/pm-communicator/models/entities/task.interface';

export interface ColumnI {
  _id: string;
  name: string;
  boardId: string;
  order: number;
  tasks: TaskI[];
}
