import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { PrismaError } from 'src/common/interfaces/prisma-error.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.prismaService.user.create({
        data: { ...createUserDto },
      });
    } catch (error) {
      const prismaError = error as PrismaError;
      if (
        prismaError.code === 'P2002' &&
        prismaError.meta?.target?.includes('email')
      ) {
        return { message: 'Instruções foram enviadas para o seu email.' };
      } else {
        throw error;
      }
    }

    return { message: 'Instruções foram enviadas para o seu email.' };
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return { users: users };
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { user: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const upadtedUser = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
    return { user: upadtedUser };
  }

  async remove(id: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    await this.prismaService.user.delete({ where: { id } });

    return { user: id };
  }
}
