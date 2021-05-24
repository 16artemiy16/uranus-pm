import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findOne({ email });

    if (user && user.password === password) {
      const { password, ...result } = user;
      return this.jwtService.sign(result);
    }

    return null;
  }

  verify(token: string): Promise<any | null> {
    return this.jwtService.verifyAsync(token).catch(() => null);
  }
}
