import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { NewsModule } from './news/news.module';

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
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DB_HOST??'localhost',
      port: parseInt(process.env.DB_PORT??'27017'),
      /*username: process.env.DB_USERNAME??'',
      password: process.env.DB_PASSWORD??'',*/
      database: process.env.DB_DATABASE??'news',
      /*ssl: true,*/

      autoLoadEntities: true,
     /* synchronize: true,*/
    }),
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
