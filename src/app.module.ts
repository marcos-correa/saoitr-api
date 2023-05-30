import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { LoginModule } from './modules/login/login.module';
import { LogoutModule } from './modules/logout/logout.module';
import { TokenModule } from './core/token/token.module';
import { BlacklistTokenMiddleware } from './core/middleware/blacklist-token.middleware';

@Module({
  imports: [UsersModule, AuthModule, LoginModule, LogoutModule, TokenModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BlacklistTokenMiddleware)
      .forRoutes({ path: '/users', method: RequestMethod.GET });
  }
}
