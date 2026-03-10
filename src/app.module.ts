import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { LoanModule } from './loan/loan.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule, 
    UserModule, 
    VideoModule, 
    LoanModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
// Assure-toi que cette ligne est EXACTEMENT comme ça :
export class AppModule {}