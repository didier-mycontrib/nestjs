import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { NewsL0Dto, NewsL1Dto } from "../dto/news.dto";
import { NewsEntity } from "../entities/news.entity";

@Injectable()
export class NewsMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, NewsL0Dto,NewsEntity);
      createMap(mapper, NewsL1Dto,NewsEntity);
      createMap(mapper, NewsEntity,NewsL1Dto ,
          forMember( d=> d.id, mapFrom(s => s.id))
        );
    };
  }
}