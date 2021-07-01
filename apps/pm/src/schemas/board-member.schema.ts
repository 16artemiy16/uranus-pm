import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BoardUserRoleEnum } from 'common/pm-communicator/models/entities/board-user-role.enum';
import { BoardUserStatusEnum } from 'common/pm-communicator/models/entities/board-user-status.enum';

@Schema()
class BoardMember {
  @Prop({
    required: true,
    type: BoardUserRoleEnum,
    enum: [BoardUserRoleEnum.Admin, BoardUserRoleEnum.User, BoardUserRoleEnum.Watcher],
  })
  role: BoardUserRoleEnum;

  @Prop({
    required: true,
    type: BoardUserStatusEnum,
    enum: [BoardUserStatusEnum.Active, BoardUserStatusEnum.Invited, BoardUserStatusEnum.Suspended],
  })
  status: BoardUserStatusEnum;

  @Prop({ required: true })
  userId: string;
}

export const BoardMemberSchema = SchemaFactory.createForClass(BoardMember);
