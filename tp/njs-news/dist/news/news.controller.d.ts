import { NewsService } from './news.service';
import { NewsDto } from './news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getNewsById(id: string): Promise<NewsDto>;
    getNewsByCriteria(): Promise<NewsDto[]>;
    create(news: NewsDto): Promise<NewsDto>;
    delete(id: string): Promise<any>;
    update(newsToUpdate: NewsDto, id: string): Promise<NewsDto>;
}
