import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  HealthCheckResult,
  HealthIndicatorResult
} from '@nestjs/terminus';
import { ServiceHealthIndicator } from './health.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private service: ServiceHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  getHealth(): Promise<HealthCheckResult> {
    return this.health.check([(): Promise<HealthIndicatorResult> => this.service.checkDB()]);
  }
}
