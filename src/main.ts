import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = +configService.get('PORT');
  const SESSION_SECRET = configService.get<string>('SESSION_SECRET');
  const IS_DEVELOPMENT = configService.get('NODE_ENV') === 'development';

  // Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Session
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  // Swagger documentation
  if (IS_DEVELOPMENT) {
    const config = new DocumentBuilder().setTitle('YAWA').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(PORT);
}
bootstrap();
