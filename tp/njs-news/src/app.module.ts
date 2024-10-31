import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsService } from './news/news.service'; 
import { NewsController } from './news/news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './news/news.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [

    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public') ,
    exclude: ['/news-api/(.*)'], 
  }),

    MongooseModule.forRoot('mongodb://localhost:27017/news'),
      MongooseModule.forFeature([ { name: "News", schema : NewsSchema}]),
       
  ],
  controllers: [AppController, NewsController],
  providers: [AppService, NewsService],
})
export class AppModule {}
