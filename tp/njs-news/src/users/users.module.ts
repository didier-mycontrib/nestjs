import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/users.entity';
import { UserMapperProfile } from './mapper/news.mapper.profile';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: "Users", schema : UserSchema}]),
  ],
  exports:[UsersService],
  providers: [UsersService,UserMapperProfile],
  controllers: [UsersController]
})
export class UsersModule {}
