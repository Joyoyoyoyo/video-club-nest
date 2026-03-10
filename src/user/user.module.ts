import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Utile si LoanModule a besoin de vérifier un User
})
export class UserModule {}