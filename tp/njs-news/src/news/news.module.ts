import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NewsController } from "./news.controller";
import { NewsSchema } from "./entities/news.entity";
import { NewsService } from "./news.service";
import { NewsMapperProfile } from "./mapper/news.mapper.profile";

@Module({
  imports: [
      MongooseModule.forFeature([ { name: "News", schema : NewsSchema}]),
  ],
  controllers: [NewsController],
  providers: [NewsService,NewsMapperProfile],
})
export class NewsModule {}
