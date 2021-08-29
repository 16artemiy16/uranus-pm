import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAction, UserActionDocument } from '../schemas/user-action.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(UserAction.name) private readonly userActionModel: Model<UserActionDocument>
  ) {}

  traceUserEvent(user: string, action: string, data?: any): Promise<any> {
    return this.userActionModel.create({
      user,
      action,
      ...(data && { data }),
    });
  }
}
