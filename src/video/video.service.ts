import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Importe ton service Prisma
import { CreateVideoDto } from './dto/create-video-dto';
import { UpdateVideoDto } from './dto/update-video-dto';

@Injectable()
export class VideoService {
  // 1. On injecte Prisma dans le constructeur (comme dans Laravel)
  constructor(private prisma: PrismaService) {}

  // 2. Créer une vidéo
  async create(createVideoDto: CreateVideoDto) {
    return this.prisma.video.create({
      data: createVideoDto,
    });
  }

  // 3. Lister toutes les vidéos (Ton index)
  async findAll() {
    return this.prisma.video.findMany();
  }

  // 4. Trouver une vidéo par son ID
  async findOne(id: number) {
    return this.prisma.video.findUnique({
      where: { id },
    });
  }

  async importMany(videos: CreateVideoDto[]) {
    return this.prisma.video.createMany({
      data: videos.map((v) => ({
        title: v.title,
        year: v.year,
        stock: Number(v.stock), // Conversion en nombre
      })),
      skipDuplicates: true, // Évite les erreurs si le titre est unique
    });
  }
}