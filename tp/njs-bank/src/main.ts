import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('bank-api');
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('bank api')
    .setDescription('Simple bank rest api')
    .setVersion('1.0')
    .addTag('bank')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('bank-api/api', app, document); //http://localhost:3000/bank-api/api



  await app.listen(process.env.PORT ?? 3000);
  //http://localhost:3000/bank-api avec AppController et AppService 
  //http://localhost:3000 ou http://localhost:3000/index.html avec ServeStaticModule
}
bootstrap();
