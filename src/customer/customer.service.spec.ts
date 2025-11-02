import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { PrismaService } from 'src/database/prisma.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: PrismaService,
          useValue: {
            customer: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should create a customer', async () => {
    const customer = {
      firstName: 'Cliente',
      lastName: 'Cliente Sobrenome',
      phone: '564685456',
      email: 'testee3@email.com',
    };

    const expectedCustomer = {
      ...customer,
      id: 'a-uuid',
      userId: 'a-uuid',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prismaService.customer, 'findUnique').mockResolvedValue(null);
    jest
      .spyOn(prismaService.customer, 'create')
      .mockResolvedValue(expectedCustomer);

    const result = await service.create(customer, 'userId');

    expect(result).toEqual(expectedCustomer);
  });
});
