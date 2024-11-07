import { Mapper } from "@automapper/core";
import { AutomapperProfile } from "@automapper/nestjs";
export declare class NewsMapperProfile extends AutomapperProfile {
    constructor(mapper: Mapper);
    get profile(): (mapper: Mapper) => void;
}
