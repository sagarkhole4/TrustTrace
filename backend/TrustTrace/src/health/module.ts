import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';

import { HealthController } from './health.controller';
import { ServiceHealthIndicator } from './health.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [ServiceHealthIndicator, PrismaService]
})
export class HealthModule {}
