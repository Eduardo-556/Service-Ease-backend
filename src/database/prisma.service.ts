import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    if (typeof this.$connect === 'function') {
      await this.$connect();
    }
  }

  async healthCheck(): Promise<object> {
    try {
      await this.$queryRaw`SELECT 1`;
      return { status: true };
    } catch {
      return { status: false };
    }
  }
}
