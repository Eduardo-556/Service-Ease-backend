import { Test, TestingModule } from '@nestjs/testing';
import { PrismaController } from './prisma.controller';
import { PrismaService } from './prisma.service';

describe('PrismaController', () => {
  let controller: PrismaController;
  const mockPrismaService = {
    healthCheck: jest.fn().mockResolvedValue({ status: true }),
  };

  beforeEach(async () => {
    mockPrismaService.healthCheck.mockClear();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrismaController],
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<PrismaController>(PrismaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call prismaService.healthCheck and return its result', async () => {
    const result = await controller.healthCheck();
    expect(mockPrismaService.healthCheck).toHaveBeenCalled();
    expect(result).toEqual({ status: true });
  });
});
