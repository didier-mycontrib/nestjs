import { NewsService } from './news.service';
import { NewsDto } from './news.dto';
import { News } from './news.itf';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getNewsById(id: string): Promise<News | undefined>;
    getNewsByCriteria(): Promise<News[]>;
    create(news: NewsDto): Promise<News | undefined>;
    delete(id: string): Promise<any>;
    update(newsToUpdate: News, id: string): Promise<News | undefined>;
}
