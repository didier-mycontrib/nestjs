import { News } from './news.itf';
import { Model } from 'mongoose';
import { NewsDoc } from './news.schema.doc';
export declare class NewsService {
    private readonly newsModel;
    constructor(newsModel: Model<NewsDoc>);
    findAll(): Promise<News[]>;
    findOne(id: string): Promise<News | null>;
    create(news: News): Promise<News>;
    delete(id: string): Promise<any>;
    update(id: string, news: News): Promise<News | null>;
}
