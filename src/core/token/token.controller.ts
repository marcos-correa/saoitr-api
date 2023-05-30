import { Controller } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller()
export class TokenController {
  constructor(private readonly _tokenService: TokenService) {}
}
