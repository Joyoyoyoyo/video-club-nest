import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // 1. Import du ConfigService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) { // 2. Injection du service
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 3. Récupération de la clé depuis le .env
      secretOrKey: configService.get<string>('JWT_SECRET')|| 'TOP_SECRET_BACKUP', 
    });
  }

  async validate(payload: any) {
    // Ce qui est retourné ici sera accessible via req.user
    return { userId: payload.sub, email: payload.email };
  }
}