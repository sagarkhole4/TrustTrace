import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix('trust-trace');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TrustTrace Service')
    .setDescription('TrustTrace Service Module')
    .setVersion('v1')
    .addBearerAuth()
    .build();

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: ['1'] // Global default version
    });

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/trust-trac/swagger', app, document);

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: [VERSION_NEUTRAL, '1'] // Global default version
    });
    
    await app.listen(configService.get('PORT') || 3004, () => {
      console.log(`Listening on Port:${configService.get('PORT')}` || '3004');
    });
}
bootstrap();
