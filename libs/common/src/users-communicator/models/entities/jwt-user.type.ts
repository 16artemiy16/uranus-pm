import { UserI } from 'common/users-communicator/models/entities/user.interface';

export type JwtUserType = Omit<UserI, 'password'>;
