import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserType } from 'common/users-communicator/models/entities/jwt-user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.usersService.findOne({ email });

    if (user && user.password === password) {
      const { password, ...result } = user;
      return this.jwtService.sign(result);
    }

    return null;
  }

  verify(token: string): Promise<JwtUserType | null> {
    return this.jwtService.verifyAsync(token).catch(() => null);
  }
}
