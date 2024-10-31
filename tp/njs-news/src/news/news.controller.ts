import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { NewsService } from './news.service'; 
import { NewsDto } from './news.dto';
import { Message } from 'src/common/message';
import { News } from './news.itf';
import { toNewsDto, toNewsDtoArray } from './news.mapper';

//controller with name=news ---> localhost:3000/news or localhost:3000/news-api/news

//NB: l'introspection swagger ne fonctionne bien (sur partie @body()) qu'avec une classe (ex: NewsDto)
//mais ne fonctionne pas bien avec une interface

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get(':id')
    async getNewsById(@Param('id') id:string): Promise<NewsDto> {
        let news = await this.newsService.findOne(id);
        if(news==undefined)  
            throw new HttpException('news not found with id='+id, HttpStatus.NOT_FOUND);
        return toNewsDto(news);
    }

    @Get()
    async getNewsByCriteria(): Promise<NewsDto[]> {
        const newsArray = await this.newsService.findAll();
        return toNewsDtoArray(newsArray);
    }

    //{ "title" : "news_xyz" , "text" : "news qui va bien" , "timestamp" : "2024-04-20T12:00:00"}
    @Post()
    async create(@Body() news: NewsDto): Promise<NewsDto> {
        const createadNews = await this.newsService.create(news);
        return toNewsDto(createadNews);
     }
  
     @Delete(':id')
     async delete(@Param('id') id:string): Promise<any> {
       let deleteOk = await this.newsService.delete(id);
       if(deleteOk==false)  
            throw new HttpException('not existing news to delete with id='+id, HttpStatus.NOT_FOUND);
       else
          return new Message("news with id="+id + " is now deleted");
    }
  
    //{"id": "1" , "title" : "news_1" , "text" : "il pleut pas beaucoup a 15h" , "timestamp" : "2024-04-20T15:00:00"}
    @Put(':id')
    async update(@Body() newsToUpdate: NewsDto, @Param('id') id:string): Promise<NewsDto> {
        let updatedNews = await  this.newsService.update(id, newsToUpdate);
        if(updatedNews==undefined)  
            throw new HttpException('not existing news to update with id='+id, HttpStatus.NOT_FOUND);
        return toNewsDto(updatedNews);
    }
      

}
