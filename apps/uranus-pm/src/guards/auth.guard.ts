import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersFacadeService } from 'common/users-communicator';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersFacade: UsersFacadeService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;

    if (!auth) {
      return false;
    }

    const [type, token] = auth.split(' ');
    if (type !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return this.usersFacade.verify(token)
      .pipe(
        tap((user) => {
          if (user) {
            req.user = user;
          } else {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
          }
        }),
        map(() => true)
      );
  }
}
