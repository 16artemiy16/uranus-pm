import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';
import { CreateUserDto } from 'common/users-communicator/dto/create-user.dto';
import { UsersFacadeService } from 'common/users-communicator';
import { UserI } from 'common/users-communicator/models/entities/user.interface';
import { tap } from 'rxjs/operators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersFacade: UsersFacadeService) {}

  @Post('auth')
  login(@Body() body: CreateUserDto) {
    return this.usersFacade.login(body.email, body.password)
      .pipe(
        tap((token) => {
          if (token === null) {
            throw new UnauthorizedException('User or email invalid');
          }
        })
      );
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll(): Observable<UserI[]> {
    return this.usersFacade.getAll();
  }

  @Post()
  create(@Body() dto: CreateUserDto): Observable<boolean> {
    return this.usersFacade.create(dto);
  }
}
