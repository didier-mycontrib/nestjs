import { Injectable } from '@nestjs/common';
import { News } from './news.itf';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewsDoc } from './news.schema';

@Injectable()
export class NewsService {

  /*NB: @InjectModel('nameOfModel') must match the name of a model
  registered in MongooseModule.forFeature([ { name: "nameOfModel", schema : SchemaQuiVaBien}])
  au sein de app.module.ts ou bien xxx.module.ts (en plus de MongooseModule.forRoot)
  */

    constructor(
        @InjectModel('News') private readonly newsModel: Model<NewsDoc>
    ){}

    async findAll():Promise<News[]>{
        return this.newsModel.find().exec();
    }

    async findOne(id: string):Promise<News|null>{
        return this.newsModel.findOne({ _id: id}).exec();
    }

    async create(news: News): Promise<News> {
        const persistentNewsEntity = new this.newsModel(news);
        return persistentNewsEntity.save();
    }

      async delete(id: string): Promise<any>{
        return this.newsModel.findByIdAndDelete(id);
      }

      async update(id: string, news: News): Promise<News|null> {
        return this.newsModel.findByIdAndUpdate( id, news, { new: true });
      }

}
