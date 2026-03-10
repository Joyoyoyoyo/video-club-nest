import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StockListener {
  constructor(private prisma: PrismaService) {}

  @OnEvent('loan.created')
  async handleLoanCreated(payload: any) {
    await this.prisma.video.update({
      where: { id: payload.videoId },
      data: { stock: { decrement: 1 } },
    });
    console.log(`📉 Stock réduit pour la vidéo ${payload.videoId}`);
  }
}