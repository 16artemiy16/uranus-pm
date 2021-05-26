import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from '../schemas/board.schema';
import { Model } from 'mongoose';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>
  ) {}

  get(filter: Record<string, any> = {}, projection: Record<string, any> = {}): Promise<any> {
    return this.boardModel.find(filter, projection).lean() as any;
  }

  create(userId: string, dto: any): Promise<any> {
    const board = new this.boardModel({ ...dto, ownerId: userId });
    return board.save();
  }
}
