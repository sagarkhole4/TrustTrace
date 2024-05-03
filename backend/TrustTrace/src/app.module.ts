import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from '@config/config';
import { validationSchema } from '@config/validation';
import { APP_FILTER } from '@nestjs/core';
import ExceptionHandler from '@src/common/exception.handler';
import { HealthModule } from './health/module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: `${process.cwd()}/.env`,
      validationSchema,
    }),
    HealthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export class AppModule {
  constructor(
    private configService: ConfigService,
  ) {}
}
