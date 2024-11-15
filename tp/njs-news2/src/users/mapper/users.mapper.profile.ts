import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { UserL0Dto, UserL1Dto } from "../dto/users.dto";
import { UserEntity } from "../entities/users.entity";

@Injectable()
export class UserMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, UserL0Dto,UserEntity);
      createMap(mapper, UserL1Dto,UserEntity);
      createMap(mapper, UserEntity,UserL1Dto, forMember( d=> d.id, mapFrom(s => s.id)));
    };
  }
}