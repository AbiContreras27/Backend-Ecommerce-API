import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './Middlewares/logger';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle("PI BACKEND")
    .setDescription(
      "This is an API built in the educational process during my studies as a full stack developer"
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('documental', app, document, { customSiteTitle: 'PI BACKEND' })

  app.use(LoggerGlobal)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Application is running on: ${process.env.PORT || 3000}`);
  });
}
bootstrap();
