import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { USERS_RESPONSES } from 'src/shared/constants/users.constant';
import { newError } from 'src/shared/responses';

class NewHttpException extends HttpException {
  constructor(response: any) {
    super(response, 401);
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // This method is called when the guard is used
  // to protect a route. Our implementation will simply
  // return the same value as the validate() method from
  // JwtStrategy. This value will be injected into the
  // request object after the guard is used.
  // async canActivate(context: ExecutionContext) {
  //   // Add your custom authentication logic here
  //   // for example, call super.logIn(request) to establish a session.
  //   return super.canActivate(context);
  // }

  // async handleRequest(err, user, info, context) {
  //   // You can throw an exception based on either "info" or "err" arguments
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // canActivate(context: ExecutionContext) {
  //   // Add your custom authentication logic here
  //   // for example, call super.logIn(request) to establish a session.
  //   return super.canActivate(context);
  // }

  // async handleRequest(err, user, info, context) {
  //   // You can throw an exception based on either "info" or "err" arguments
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}
