import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { NewsModule } from './news/news.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { OAuthStrategy } from './common/oauth.stategy';
import { ScopesGuard } from './common/scopes.guard';
import { MyPublicPrivateAuthGuard } from './common/my-auth.guard';
import { AuthModule } from './auth/auth.module';

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
    PassportModule,
    NewsModule,
    AuthModule.forRoot({enableGlobalSecurity:true})
  ],
  controllers: [AppController],
  providers: [AppService , OAuthStrategy,
    {
      provide: APP_GUARD,
      /*useClass: AuthGuard('myOauthKeycloakStrategy'),*/ 
      useClass:  MyPublicPrivateAuthGuard //401 if no valid token , ...
    },
    {
      provide: APP_GUARD,
      useClass: ScopesGuard,  //403 if no valid scope
    }
    ],
})
export class AppModule {}
