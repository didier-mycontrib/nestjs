import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer/customer.entity';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';

// option synchronize:true de typeorm pour créer les tables automatiquement (dev only , not prod !!!)

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public') ,
      exclude: ['/bank-api/(.*)'], 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestJsBankDb',
      entities: [CustomerEntity]
    }),
    TypeOrmModule.forFeature([CustomerEntity])
  ],
  controllers: [AppController, CustomerController],
  providers: [AppService, CustomerService],
})
export class AppModule {}
