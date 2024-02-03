import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './app/errors/not-found-error/not-found-error.filter';
import { AlreadyExistsErrorFilter } from './app/errors/already-exists-error/already-exists-error.filter';
import { UnauthorizedErrorFilter } from './app/errors/unauthorized-error/unauthorized-error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadResquestErrorFilter } from './app/errors/bad-request-error/bad-request-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
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

  await app.listen(3000);
}
bootstrap();
