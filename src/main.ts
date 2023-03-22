import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const PORT = +configService.get('PORT');
  const IS_DEVELOPMENT = configService.get('NODE_ENV') === 'development';

  // Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Templating
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'assets', 'templates', 'pages'));

  // Swagger documentation
  if (IS_DEVELOPMENT) {
    const config = new DocumentBuilder().setTitle(env.APP_NAME).build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(PORT);
}
bootstrap();
