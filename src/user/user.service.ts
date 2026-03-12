import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt'; // On importe bcrypt

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {

    const { password, ...userData } = createUserDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword, // On remplace le clair par le hash
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
        // Optionnel : On ne renvoie pas les mots de passe dans la liste
        select: { id: true, email: true, name: true } 
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}