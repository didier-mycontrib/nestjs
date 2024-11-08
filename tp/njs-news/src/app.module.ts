import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NewsModule } from './news/news.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.gard';
import { ScopesGuard } from './auth/scopes.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
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
  NewsModule,
  AuthModule,
  UsersModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ScopesGuard,
    }
  ],
})
export class AppModule {}

//NB: authentification JWT selon https://docs.nestjs.com/security/authentication
