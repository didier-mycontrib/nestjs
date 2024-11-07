import { NewsService } from './news.service';
import { NewsL1Dto, NewsL0Dto } from './dto/news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getById(id: string): Promise<NewsL1Dto>;
    findByCriteria(): Promise<NewsL1Dto[]>;
    create(news: NewsL0Dto): Promise<NewsL1Dto>;
    remove(id: string): Promise<any>;
    update(newsToUpdate: NewsL1Dto, id: string): Promise<NewsL1Dto>;
}
