import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { LoginModule } from './modules/login/login.module';
import { LogoutModule } from './modules/logout/logout.module';
import { TokenModule } from './core/token/token.module';
import { BlacklistTokenMiddleware } from './core/middleware/blacklist-token.middleware';
import { OccurrencesModule } from './modules/occurrences/occurrences.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    LoginModule,
    LogoutModule,
    TokenModule,
    OccurrencesModule,
    JwtModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BlacklistTokenMiddleware).forRoutes(
      {
        path: '/users',
        method: RequestMethod.GET,
      },
      {
        path: '/users/:id',
        method: RequestMethod.GET,
      },
      {
        path: '/users/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/users/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: '/occurrences',
        method: RequestMethod.POST,
      },
      {
        path: '/occurrences/:id',
        method: RequestMethod.PUT,
      },
      {
        path: '/occurrences/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: '/occurrences/users/:id',
        method: RequestMethod.GET,
      },
    );
  }
}
