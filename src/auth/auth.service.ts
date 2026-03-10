import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    // 1. On cherche l'utilisateur par email
    const user = await this.userService.findByEmail(email);

    // 2. On compare le mot de passe envoyé avec le hash en base
    if (user && await bcrypt.compare(pass, user.password)) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    
    throw new UnauthorizedException('Identifiants invalides');
  }
}