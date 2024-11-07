import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewsDoc, NewsEntity } from './entities/news.entity';
import { NewsL0Dto, NewsL1Dto } from './dto/news.dto';
//import { toNewsL1Dto , toNewsL1DtoArray } from './news.mapper';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';


@Injectable()
export class NewsService {

  /*NB: @InjectModel('nameOfModel') must match the name of a model
  registered in MongooseModule.forFeature([ { name: "nameOfModel", schema : SchemaQuiVaBien}])
  au sein de app.module.ts ou bien xxx.module.ts (en plus de MongooseModule.forRoot)
  */

    constructor(
        @InjectModel('News') private readonly newsModel: Model<NewsDoc>,
        @InjectMapper() private readonly classMapper: Mapper,
    ){}

    async findAll():Promise<NewsL1Dto[]>{
      const newsDocArray  : NewsDoc[] = await this.newsModel.find().exec();
      //console.log(`newsDocArray=${JSON.stringify(newsDocArray)}`)
      return this.classMapper.mapArrayAsync(newsDocArray,NewsEntity,NewsL1Dto);
    }

    async findOne(id: string):Promise<NewsL1Dto>{
     try{ 
        const newsDoc = await this.newsModel.findOne({ _id: id}).exec();
        return this.classMapper.mapAsync(newsDoc,NewsEntity,NewsL1Dto);
     }catch(ex){
        throw new Error(`NOT_FOUND: news not found with id=${id}`);
     }
    }

    async create(news: NewsL0Dto): Promise<NewsL1Dto> {
        const newsToCreate = news; // compatible , more simple
        //const newsToCreate = this.classMapper.map(news,NewsL0Dto,NewsEntity); //ok
        const persistentNewsEntity = new this.newsModel(newsToCreate);
        const savedNewsAsNewsEntity = <NewsEntity> <any> await persistentNewsEntity.save();
        return this.classMapper.mapAsync(savedNewsAsNewsEntity,NewsEntity,NewsL1Dto);
    }

      async remove(id: string): Promise<any>{
        const doesNewsExit = await this.newsModel.exists({ _id: id });
        if(!doesNewsExit)
          throw new Error(`NOT_FOUND: not existing news to delete with id==${id}`);

        try{ 
          return await this.newsModel.findByIdAndDelete(id); //deletedNews
        }catch(ex){
         throw new Error(`Exception in NewsService.remove() with id==${id}`);
        }
      }

      async update(id: string, newsDto: NewsL1Dto): Promise<NewsL1Dto> {
        const newsToUpdate = newsDto; // compatible , more simple
        //const newsToUpdate = this.classMapper.map(newsDto,NewsL1Dto,NewsEntity); //ok
        const updatedNewsAsNewsEntity = <NewsEntity> <any> await this.newsModel.findByIdAndUpdate( id, newsToUpdate, { newsToUpdate: true });
        if(updatedNewsAsNewsEntity==undefined)  
          throw new Error(`NOT_FOUND: not existing news to update with id=${id}`);
        return this.classMapper.mapAsync(updatedNewsAsNewsEntity,NewsEntity,NewsL1Dto);
      }

}


/******************  OLD  VERSIONS */
/*
    async findOne(id: string):Promise<NewsL1Dto|null>{
     try{
        //return  toNewsL1Dto(await this.newsModel.findOne({ _id: id}).exec()); 
        const newsDoc = await this.newsModel.findOne({ _id: id}).exec();
        return this.classMapper.mapAsync(newsDoc,NewsEntity,NewsL1Dto);
     }catch(ex){
        //return null;
        throw new Error(`NOT_FOUND: news not found with id=${id}`);
     }
    }

*/
