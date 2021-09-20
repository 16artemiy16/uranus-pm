import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model, QueryOptions } from 'mongoose';
import { CreateUserDto } from 'common/users-communicator/dto/create-user.dto';
import { UserI } from 'common/users-communicator/models/entities/user.interface';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAll(query: any = {}, projection: any = {}, options: QueryOptions = {}): Promise<UserI[]> {
    return await this.userModel.find(query, projection, options).lean().exec() as UserI[];
  }

  async find(filter = {}, projection = {}): Promise<UserI[]> {
    return await this.userModel.find(filter, projection).lean() as UserI[];
  }

  async findOne(filter = {}, projection = {}): Promise<UserI> {
    return await this.userModel.findOne(filter, projection).lean() as UserI;
  }

  async count(filter = {}): Promise<number> {
    return await this.userModel.countDocuments(filter);
  }

  async create(dto: CreateUserDto): Promise<boolean> {
    const { email, password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (await this.userModel.count({ email })) {
      throw new RpcException({
        statusCode: 400,
        message: 'emailOccupied',
      });
    }

    const user = new this.userModel({ ...dto, password: hashedPassword });
    await user.save();
    return true;
  }

  async toggleFavouriteBoard(boardId: string, userId: string): Promise<boolean> {
    const isBoardInFavourite = await this.userModel.findById(userId, { _id: 0, favouriteBoards: 1 })
      .lean()
      .exec()
      .then(({ favouriteBoards }) => (favouriteBoards || []).includes(boardId));

    const toggleOperator = isBoardInFavourite ? '$pull' : '$push';

    await this.userModel.updateOne(
      { _id: Types.ObjectId(userId) },
      { [toggleOperator]: { favouriteBoards: boardId } },
    );

    return true;
  }
}
