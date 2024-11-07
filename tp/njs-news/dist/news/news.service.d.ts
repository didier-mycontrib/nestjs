import { Model } from 'mongoose';
import { NewsDoc } from './entities/news.entity';
import { NewsL0Dto, NewsL1Dto } from './dto/news.dto';
import { Mapper } from '@automapper/core';
export declare class NewsService {
    private readonly newsModel;
    private readonly classMapper;
    constructor(newsModel: Model<NewsDoc>, classMapper: Mapper);
    findAll(): Promise<NewsL1Dto[]>;
    findOne(id: string): Promise<NewsL1Dto>;
    create(news: NewsL0Dto): Promise<NewsL1Dto>;
    remove(id: string): Promise<any>;
    update(id: string, newsDto: NewsL1Dto): Promise<NewsL1Dto>;
}
