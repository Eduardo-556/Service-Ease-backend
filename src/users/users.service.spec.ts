import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../database/prisma.service';

const prismaMock = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const createUserDto = {
      firstName: 'Eduardo',
      lastName: 'Silva',
      phone: '12345678',
      email: 'eduardo@email.com',
      password: 'password',
    };

    const expectedUser = {
      id: 'a-uuid',
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.create.mockResolvedValue(expectedUser);
    const result = await service.create(createUserDto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.user.create).toHaveBeenCalledWith({ data: createUserDto });
    expect(result).toEqual({
      message: 'Instruções foram enviadas para o seu email.',
    });
  });

  it('should return all users', async () => {
    const mockUsers = [
      {
        id: '1',
        firstName: 'Eduardo',
        lastName: 'Silva',
        phone: '12345678',
        email: 'eduardo@email.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        firstName: 'Maria',
        lastName: 'Santos',
        phone: '87654321',
        email: 'maria@email.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    prismaMock.user.findMany.mockResolvedValue(mockUsers);
    const result = await service.findAll();

    expect(prismaMock.user.findMany).toHaveBeenCalled();
    expect(result).toEqual({ users: mockUsers });
  });

  it('should return one user', async () => {
    const userId = 'a-uuid';
    const mockUsers = [
      {
        id: 'a-uuid',
        firstName: 'Eduardo',
        lastName: 'Silva',
        phone: '12345678',
        email: 'eduardo@email.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a-uuid2',
        firstName: 'Maria',
        lastName: 'Santos',
        phone: '87654321',
        email: 'maria@email.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    prismaMock.user.findUnique.mockResolvedValue(mockUsers[0]);
    const result = await service.findOne(userId);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(result).toEqual({ user: mockUsers[0] });
  });

  it('Should update a user when found', async () => {
    const updateUserDto = {
      firstName: 'Teste',
      phone: '999999',
    };
    const userId = 'a-uuid';
    const existingUser = {
      id: userId,
      firstName: 'Eduardo',
      lastName: 'Silva',
      phone: '123456',
      password: 'password',
      cratedAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedUser = { ...existingUser, ...updateUserDto };
    prismaMock.user.findUnique.mockResolvedValue(existingUser);
    prismaMock.user.update.mockResolvedValue(updatedUser);
    const result = await service.update(userId, updateUserDto);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: updateUserDto,
    });
    expect(result).toEqual({ user: updatedUser });
  });

  it('Should throw an error if user to update is not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    await expect(service.update('non-existent-id', {})).rejects.toThrow(
      'User not found',
    );
  });

  it('Should remove a user when found', async () => {
    const userId = 'a-uuid';
    const existingUser = {
      id: userId,
      firstName: 'Eduardo',
      lastName: 'Silva',
      phone: '123456',
      password: 'password',
      cratedAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(existingUser);
    prismaMock.user.delete.mockResolvedValue(existingUser);
    const result = await service.remove(userId);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(prismaMock.user.delete).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(result).toEqual({ user: userId });
  });

  it('Should throw an error if user to remove is not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const userId = 'a-uuid';
    await expect(service.remove(userId)).rejects.toThrow('User not found');
  });
});
