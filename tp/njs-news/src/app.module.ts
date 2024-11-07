import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NewsModule } from './news/news.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { NewsMapperProfile } from './news/mapper/news.mapper.profile';

@Module({
  imports: [

  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public') ,
    exclude: ['/news-api/(.*)'], 
  }),
  AutomapperModule.forRoot(
        {
            strategyInitializer: classes(),
        } 
  ),
  MongooseModule.forRoot('mongodb://localhost:27017/news'),
  NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
