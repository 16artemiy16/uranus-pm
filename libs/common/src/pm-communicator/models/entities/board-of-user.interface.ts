import { BoardI } from 'common/pm-communicator/models/entities/board.interface';

export interface BoardOfUserI extends BoardI {
  isFavourite: boolean;
}
