import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAction, UserActionDocument } from '../schemas/user-action.schema';
import { Model } from 'mongoose';
import { ResGetUserFavouriteBoards } from 'common/analytics-communicator/models/res.model';

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

  getUserFavouriteBoards(user: string, limit: number): Promise<ResGetUserFavouriteBoards> {
    return this.userActionModel
      .aggregate([
        { $match: { user } },
        {
          $group: {
            _id: { id: '$data.targetId' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: limit },
        { $project: { board: '$_id.id', _id: 0, count: 1 } },
      ])
      .exec();
  }
}
