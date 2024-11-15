import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('news-api');
 
  app.useGlobalPipes(new ValidationPipe()); //to validate input with @Is...() from class-validator in DTO class , plain object
  //app.useGlobalPipes(new ValidationPipe({transform:true})); to validate and transform json input as Dto instance
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('news api')
    .setDescription('Simple news rest api')
    .setVersion('1.0')
    .addTag('bank')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('news-api/api', app, document); //http://localhost:3000/news-api/api

  //setGlobalAppAccess(app);

  await app.listen(process.env.PORT ?? 3000);
  //http://localhost:3000/news-api avec AppController et AppService 
  //http://localhost:3000 ou http://localhost:3000/index.html avec ServeStaticModule
}
bootstrap();


/*
in main.ts : setGlobalAppAccess(app);

in other part of nestJs app: 

var globalApp : INestApplication;
export function setGlobalAppAccess(app: INestApplication) {
  globalApp = app;
}

...

const XyzService: xyzService = await globalApp.resolve(XyzService);
...
*/