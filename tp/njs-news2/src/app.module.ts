import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { getIsOauth2EnabledCongifServiceConfigService } from './auth/IsOauth2EnabledCongifService';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/users.entity';
import { NewsEntity } from './news/entities/news.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

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

      entities: [UserEntity,NewsEntity] ,

      autoLoadEntities: true,
     /* synchronize: true,*/
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
    UsersModule,
    NewsModule,
    
    AuthModule.forRootAsync( 
      {
        useFactory : async () => {
           const configService = await getIsOauth2EnabledCongifServiceConfigService(
             "https://www.d-defrance.fr/keycloak/realms/sandboxrealm/.well-known/openid-configuration");
           return  {enableGlobalSecurity:true ,
                     isOauth2Enabled:  configService.get('isOauth2Enabled') }
           } , 
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService ]
})
export class AppModule {}
