import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // <-- Importe ça
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Active la validation automatique pour tous les contrôleurs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,     // Supprime les champs qui ne sont pas dans le DTO
    forbidNonWhitelisted: true, // Erreur si on envoie un champ inconnu
    transform: true,     // Transforme les types (ex: string -> number)
  }));

  await app.listen(3000);
}
bootstrap();