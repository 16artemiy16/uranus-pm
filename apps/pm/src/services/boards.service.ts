import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from '../schemas/board.schema';
import { Model } from 'mongoose';
import { BoardI } from 'common/pm-communicator/models/entities/board.interface';
import { CreateBoardDto } from 'common/pm-communicator/dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>
  ) {}

  async get(filter: Record<string, any> = {}, projection: Record<string, any> = {}): Promise<BoardI[]> {
    return await this.boardModel.find(filter, projection).lean() as BoardI[];
  }

  create(userId: string, dto: CreateBoardDto): Promise<BoardDocument> {
    const board = new this.boardModel({ ...dto, ownerId: userId });
    return board.save();
  }
}
