import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { ResGetAll, UserI } from 'common/users-communicator';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<ResGetAll> {
    return await this.userModel.find().lean() as ResGetAll;
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

  async create(dto: any): Promise<any> {
    const user = new this.userModel(dto);
    return await user.save();
  }
}
