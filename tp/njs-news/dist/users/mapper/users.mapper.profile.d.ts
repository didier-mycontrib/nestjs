import { Mapper } from "@automapper/core";
import { AutomapperProfile } from "@automapper/nestjs";
export declare class UserMapperProfile extends AutomapperProfile {
    constructor(mapper: Mapper);
    get profile(): (mapper: Mapper) => void;
}
