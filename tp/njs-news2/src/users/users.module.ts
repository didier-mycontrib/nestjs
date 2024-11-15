import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserMapperProfile } from './mapper/users.mapper.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  exports:[UsersService],
  providers: [UsersService,UserMapperProfile],
  controllers: [UsersController]
})
export class UsersModule {}
