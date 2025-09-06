import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('prisma')
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}
  @Get('health')
  healthCheck() {
    return this.prismaService.healthCheck();
  }
}
