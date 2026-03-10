import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan-dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService, private eventEmitter: EventEmitter2) {}

  async create(createLoanDto: CreateLoanDto) {
    // 1. On compte les emprunts actifs (date de retour est nulle)
    const activeLoansCount = await this.prisma.loan.count({
      where: {
        userId: createLoanDto.userId,
        return_date: null,
      },
    });

    // 2. La règle du Video Club : 3 max !
    if (activeLoansCount >= 3) {
      throw new BadRequestException("Limite de 3 vidéos atteinte. Rendez vos anciens films !");
    }

    // 3. Si c'est bon, on crée l'emprunt
// 3. On crée l'emprunt et on attend le résultat
    const newLoan = await this.prisma.loan.create({
      data: {
        userId: createLoanDto.userId,
        videoId: createLoanDto.videoId,
      },
    });

    // 4. LE DISPATCHER : On prévient le reste de l'app que c'est fait
    this.eventEmitter.emit('loan.created', newLoan);

    return newLoan;
  }

  findAll() {
    return this.prisma.loan.findMany({
      include: { user: true, video: true } // Pour voir les noms dans le JSON
    });
  }

  async findByUser(userId: number) {
    return this.prisma.loan.findMany({
      where: {
        userId: userId, // On filtre par l'ID de l'utilisateur
      },
      include: {
        video: true, // Optionnel : permet de récupérer les infos de la vidéo liée
      },
      orderBy: {
        loan_date: 'desc', // Optionnel : affiche les plus récents en premier
      },
    });
  }

}