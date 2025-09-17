import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { PrismaError } from 'src/common/interfaces/prisma-error.interface';
import password from './passwordService/password';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await password.hash(createUserDto.password);
      createUserDto.password = hashedPassword;
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
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { users: users };
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const userWithoutPassword = {
      ...user,
      password: undefined,
    };
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { user: userWithoutPassword };
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
