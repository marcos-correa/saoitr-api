import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
export const jwtConstants = {
  secret: '1101099-Marcos',
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Esse metodo define a estrategia de autenticacao que sera usada pelo passport para validar o token
  // No LoginModule, o metodo validate() é chamado pelo passport para validar o token
  // O metodo validate() recebe o payload do token e retorna um objeto com os dados do usuario
  // O passport injeta o objeto retornado pelo metodo validate() na requisicao

  // const payload = { username: user.email, id: validUser.id };
  //       const token = this._jwtService.sign(payload);
  // no login service, o metodo sign() recebe o payload e retorna o token
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: false,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
