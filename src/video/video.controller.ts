import { Controller, Get, Post, Body, Injectable, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video-dto';
import { UpdateVideoDto } from './dto/update-video-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('video') // Toutes les routes commenceront par /video
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  findAll() {
    return this.videoService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  // Le ParseIntPipe transforme le string de l'URL en number automatiquement
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('import-json')
  async importJson(@Body() videos: any[]) {
    // On passe le tableau reçu au service
    const result = await this.videoService.importMany(videos);
    return {
      message: "Import réussi !",
      count: result.count, // Affiche le nombre de vidéos créées
    };
  }
}
