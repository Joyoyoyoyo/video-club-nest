import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() createLoanDto: CreateLoanDto) {
    // Cette méthode va appeler la logique de vérification dans le service
    return this.loanService.create(createLoanDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.loanService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-loans') 
  async findMyLoans(@Req() req) {
    // req.user contient ce que tu as renvoyé dans le validate() de ta JwtStrategy
    const userId = req.user.userId; 
    return this.loanService.findByUser(userId);
  }
}