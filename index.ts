import { BadResquestErrorFilter } from './src/app/errors/bad-request-error/bad-request-error.filter';
import { UnauthorizedErrorFilter } from './src/app/errors/unauthorized-error/unauthorized-error.filter';
import { AlreadyExistsErrorFilter } from './src/app/errors/already-exists-error/already-exists-error.filter';
import { NotFoundErrorFilter } from './src/app/errors/not-found-error/not-found-error.filter';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const expressServer = express();

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new NotFoundErrorFilter(),
    new AlreadyExistsErrorFilter(),
    new UnauthorizedErrorFilter(),
    new BadResquestErrorFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Healthy Life Api')
    .setDescription('Sistema de saúde')
    .setVersion('1.0')
    .addTag('healthy-life')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
