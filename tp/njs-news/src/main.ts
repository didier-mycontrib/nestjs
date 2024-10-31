import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('news-api');
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('news api')
    .setDescription('Simple news rest api')
    .setVersion('1.0')
    .addTag('news')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('news-api/api', app, document); //http://localhost:3000/news-api/api



  await app.listen(process.env.PORT ?? 3000);
  //http://localhost:3000/news-api avec AppController et AppService 
  //http://localhost:3000 ou http://localhost:3000/index.html avec ServeStaticModule
}
bootstrap();
