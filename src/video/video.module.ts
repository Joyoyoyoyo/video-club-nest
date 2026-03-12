import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { PassportModule } from '@nestjs/passport';
import { StockListener } from './stock.listener';

@Module({
  imports: [PassportModule],
  controllers: [VideoController],
  providers: [VideoService, StockListener],
})
export class VideoModule {}