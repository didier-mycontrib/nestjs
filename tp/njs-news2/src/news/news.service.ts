import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectId } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { NewsL0Dto, NewsL1Dto } from './dto/news.dto';
import { NewsEntity } from './entities/news.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

//NB: no need of  "@types/mongodb" after version "4.0.7"


@Injectable()
export class NewsService {

     constructor(
      @InjectRepository(NewsEntity)  private newsRepository: MongoRepository<NewsEntity>,
      @InjectMapper() private readonly classMapper: Mapper,
    ){}

    async findAll():Promise<NewsL1Dto[]>{
      const newsEntityArray  : NewsEntity[] = await this.newsRepository.find();
      return this.classMapper.mapArrayAsync(newsEntityArray,NewsEntity,NewsL1Dto);
    }

    async findOne(id: string):Promise<NewsL1Dto>{
      try{ 
         const newsEntity = await this.newsRepository.findOneById( id); //deprecated but alternative dont work !!!
         if(newsEntity==null)
             throw new Error(`NOT_FOUND: news not found with id=${id}`);
         else
             return this.classMapper.mapAsync(newsEntity,NewsEntity,NewsL1Dto);
      }catch(ex){
         throw new Error(`NOT_FOUND: news not found with id=${id}`);
      }
     }

    async create(news: NewsL0Dto): Promise<NewsL1Dto> {
      const newsToCreate = news; // compatible , more simple
      //const newsToCreate = this.classMapper.map(news,NewsL0Dto,NewsEntity); //ok
      const savedNewsAsNewsEntity = await this.newsRepository.save(newsToCreate);
      return this.classMapper.mapAsync(savedNewsAsNewsEntity,NewsEntity,NewsL1Dto);
  }

  async remove(id: string): Promise<any>{
    
    //const doesNewsExit = await this.newsRepository.exists({ where: { id: id } });
    //dont work because Query Builder is not supported by MongoDB
    const doesNewsExit = (await this.newsRepository.findOneById( id))!=null ;
    if(!doesNewsExit)
      throw new Error(`NOT_FOUND: not existing news to delete with id==${id}`);
   
    try{ 
      return await this.newsRepository.delete(id);; //deletedNews
    }catch(ex){
     throw new Error(`Exception in NewsService.remove() with id==${id}`);
    }
  }

  async update(id: string, newsDto: NewsL1Dto): Promise<NewsL1Dto> {
    const doesNewsExit = (await this.newsRepository.findOneById( id))!=null ;
    if(!doesNewsExit)
        throw new Error(`NOT_FOUND: not existing news to update with id==${id}`);
    try{ 
        const newsToUpdate = newsDto; // compatible , more simple
        //const newsToUpdate = this.classMapper.map(newsDto,NewsL1Dto,NewsEntity); //ok
        const updateResult =  await this.newsRepository.update(id, newsToUpdate);
        console.log("updateResult="+JSON.stringify(updateResult)); //no updatedNewsAsNewsEntity , just raw.modifiedCount
        return this.findOne(id);
    }catch(ex){
       throw new Error(`Exception in NewsService.update() with id==${id}`);
    }
  }


}
