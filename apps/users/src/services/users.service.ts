import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'common/users-communicator/dto/create-user.dto';
import { UserI } from 'common/users-communicator/models/entities/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<UserI[]> {
    return await this.userModel.find().lean() as UserI[];
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
    const { password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({ ...dto, password: hashedPassword });
    await user.save();
    return true;
  }
}
