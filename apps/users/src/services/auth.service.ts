import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserType } from 'common/users-communicator/models/entities/jwt-user.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.usersService.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const { _id, email } = user;
      return this.jwtService.sign({ _id, email });
    }

    return null;
  }

  verify(token: string): Promise<JwtUserType | null> {
    return this.jwtService.verifyAsync(token).catch(() => null);
  }

  async isEmailFree(email: string): Promise<boolean> {
    return await this.usersService.count({ email }) === 0;
  }
}
