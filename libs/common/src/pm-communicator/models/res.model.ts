import { BoardI } from 'common/pm-communicator/models/entities/board.interface';
import { BoardDocument } from '../../../../../apps/pm/src/schemas/board.schema';

export type ResGet = BoardI[];
export type ResCreate = BoardDocument;
