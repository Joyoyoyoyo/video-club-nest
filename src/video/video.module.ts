import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { VideoController } from './video.controller';
import { PassportModule } from '@nestjs/passport';
import { StockListener } from './stock.listener';

@Module({
  imports: [PrismaModule, PassportModule], // <-- Ajoute ceci ici
  controllers: [VideoController],
  providers: [VideoService, StockListener],
})
export class VideoModule {}