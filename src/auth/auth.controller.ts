import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login') // L'URL sera http://localhost:3000/auth
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // On renvoie 200 au lieu de 201 (car on ne crée rien en base)
  @Post()
  async login(@Body() loginDto: any) {
    // loginDto doit contenir email et password
    return this.authService.login(loginDto.email, loginDto.password);
  }
}