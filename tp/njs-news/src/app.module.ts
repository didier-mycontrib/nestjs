import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsService } from './news/news.service'; 
import { NewsController } from './news/news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsDto } from './news/news.dto';
import { NewsSchema } from './news/news.schema.doc';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/news'),
            MongooseModule.forFeature([ { name: "News", schema : NewsSchema}])],
  controllers: [AppController, NewsController],
  providers: [AppService, NewsService],
})
export class AppModule {}
