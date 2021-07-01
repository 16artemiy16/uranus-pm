import { BoardMemberI } from 'common/pm-communicator/models/entities/board-member.interface';

export interface BoardI {
  _id: string;
  name: string;
  ownerId: string;
  members: BoardMemberI[];
}
