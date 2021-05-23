import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  getAll(): Promise<any> {
    return this.userModel.find({}).lean() as any;
  }

  async create(dto: any): Promise<any> {
    const user = new this.userModel(dto);
    return await user.save();
  }
}
