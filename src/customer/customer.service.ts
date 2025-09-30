import { Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto, userId: string) {
    try {
      const dataToCreate = { ...createCustomerDto, userId };

      return await this.prismaService.customer.create({
        data: dataToCreate,
      });
    } catch (error) {
      this.logger.error('Falha ao criar cliente', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: string) {
    return `This action returns a #${id} customer`;
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return `${id}, ${updateCustomerDto.email}`;
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
