import { Module } from "@nestjs/common";
import { NewsController } from "./news.controller";
import { NewsEntity} from "./entities/news.entity";
import { NewsService } from "./news.service";
import { NewsMapperProfile } from "./mapper/news.mapper.profile";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity])
  ],
  controllers: [NewsController],
  providers: [NewsService,NewsMapperProfile],
})
export class NewsModule {}
