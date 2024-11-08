import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service'; 
import { Message } from 'src/common/message';
import { NewsL1Dto, NewsL0Dto } from './dto/news.dto';
import { ErrorExceptionFilter, HttpExceptionFilter } from 'src/common/error.exception.filter';
import { Public } from 'src/auth/public.decorator';
import { HasScopes } from 'src/auth/rolesOrScope.decorator';

//controller with name=news ---> localhost:3000/news or localhost:3000/news-api/news

//NB: l'introspection swagger ne fonctionne bien (sur partie @body()) qu'avec une classe (ex: NewsDto)
//comportant des @ApiProperty() mais ne fonctionne pas bien avec une interface ou une classe sans decorateur

@Controller('news')
@UseFilters(new ErrorExceptionFilter(),new HttpExceptionFilter())
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get(':id')
    @Public()
    async getById(@Param('id') id:string): Promise<NewsL1Dto> {
      return this.newsService.findOne(id);
    }

    @Get()
    @Public()
    //@UseInterceptors(ClassSerializerInterceptor)
    async findByCriteria(): Promise<NewsL1Dto[]> {
        return  this.newsService.findAll();
    }

    //{ "title" : "news_xyz" , "text" : "news qui va bien" , "timestamp" : "2024-04-20T12:00:00"}
    @Post()
    @HasScopes("resource.write")
    async create(@Body() news: NewsL0Dto): Promise<NewsL1Dto> {
        console.log("post/create newsDto="+JSON.stringify(news));
        return this.newsService.create(news);//returning news with generated id
     }
  
     @Delete(':id')
     //@HttpCode(204) if no return json message
     async remove(@Param('id') id:string): Promise<any> {
       let deletedNews = await this.newsService.remove(id);
       return new Message("news with id="+id + " is now deleted"); //with default 200/OK
       //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
  
    //{"id": "1" , "title" : "news_1" , "text" : "il pleut pas beaucoup a 15h" , "timestamp" : "2024-04-20T15:00:00"}
    @Put(':id') //or @Patch(':id')
     //@HttpCode(204) if no return updeted value as json object
    async update(@Body() newsToUpdate: NewsL1Dto, @Param('id') id:string): Promise<NewsL1Dto> {
        return  this.newsService.update(id, newsToUpdate); //updatedNews as Promise
        //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
      

}


/************* OLD VERSIONS */
/*
       @Get(':id')
       async getById(@Param('id') id:string): Promise<NewsL1Dto> {
       
        let news = await this.newsService.findOne(id);
        if(news==undefined)  
            throw new HttpException('no news for id='+id, HttpStatus.NOT_FOUND);
        return news;
        }
  
      @Get(':id')
        async getById(@Param('id') id:string): Promise<NewsL1Dto> {
       try{
        let news = await this.newsService.findOne(id);
        if(news==undefined)  
            throw new HttpException('news not_found with id='+id, HttpStatus.NOT_FOUND);
         else 
          return news;
       }catch(ex){
              //throw new HttpException('news not found with id='+id, HttpStatus.NOT_FOUND);
              throw new HttpException(ex.message, HttpStatus.NOT_FOUND);
       }
    }



*/