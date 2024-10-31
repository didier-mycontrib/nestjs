import { NewsDto } from "./news.dto";
import { News } from "./news.itf";
export declare function toNewsDto(n: News): NewsDto;
export declare function toNewsDtoArray(nArray: News[]): NewsDto[];
export declare function fromNewsDto(n: NewsDto): News;
