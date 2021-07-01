import { BoardUserRoleEnum } from 'common/pm-communicator/models/entities/board-user-role.enum';
import { BoardUserStatusEnum } from 'common/pm-communicator/models/entities/board-user-status.enum';

export interface BoardMemberI {
  userId: string;
  role: BoardUserRoleEnum;
  status: BoardUserStatusEnum;
}
