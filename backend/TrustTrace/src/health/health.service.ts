import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceHealthIndicator extends HealthIndicator {
  constructor(private readonly prismaService: PrismaService, private microservice: MicroserviceHealthIndicator) {
    super();
  }

  async checkDB(): Promise<HealthIndicatorResult> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return this.getStatus('database', true);
    } catch (e) {
      throw new HealthCheckError('database', this.getStatus('database', false));
    }
  }
}
