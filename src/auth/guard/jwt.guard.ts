import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwtHihihi') {
  constructor() {
    super();
  }
}
