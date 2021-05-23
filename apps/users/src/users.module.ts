import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../../../config/mongo.config';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.users.connection),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
