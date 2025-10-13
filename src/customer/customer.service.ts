import { Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaError } from 'src/common/interfaces/prisma-error.interface';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto, userId: string) {
    try {
      const dataToCreate = { ...createCustomerDto, userId };
      const customerAlreadyExists =
        await this.prismaService.customer.findUnique({
          where: { email: dataToCreate.email },
        });
      if (customerAlreadyExists) {
        return {
          message: 'Já existe um cliente com esse email.',
        };
      }
      return await this.prismaService.customer.create({
        data: dataToCreate,
      });
    } catch (error) {
      const prismaError = error as PrismaError;
      return prismaError;
    }
  }

  async findAll(userId: string) {
    try {
      const customers = await this.prismaService.customer.findMany({
        where: { userId },
      });

      if (!customers.length) {
        return { message: 'Nenhum cliente encontrado para esse usuário.' };
      }

      return { customers };
    } catch (error) {
      const prismaError = error as PrismaError;
      return prismaError;
    }
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
