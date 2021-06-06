import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '../guards/auth.guard';
import { CreateUserDto } from 'common/users-communicator/dto/create-user.dto';
import { UsersFacadeService } from 'common/users-communicator';
import { UserI } from 'common/users-communicator/models/entities/user.interface';
import { tap } from 'rxjs/operators';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersFacade: UsersFacadeService) {}

  @ApiOkResponse({ description: 'Returns JWT token if the credentials correct', type: String })
  @ApiUnauthorizedResponse({ description: 'The credentials incorrect' })
  @HttpCode(200)
  @Post('auth')
  login(@Body() body: CreateUserDto) {
    return this.usersFacade.login(body.email, body.password)
      .pipe(
        tap((token) => {
          if (token === null) {
            throw new UnauthorizedException('userNotExist');
          }
        })
      );
  }

  @ApiOkResponse({ description: 'Checks is the email free to use', type: Boolean })
  @Get('email_is_free/:email')
  emailIsFree(@Param('email') email: string): Observable<boolean> {
    return this.usersFacade.emailIsFree(email);
  }

  @ApiBearerAuth()
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
