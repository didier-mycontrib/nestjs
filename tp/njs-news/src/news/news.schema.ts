import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose'
import { News } from './news.itf';

@Schema()
export class NewsEntity implements News {

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  timestamp: string;
}

/*

@Prop([String])
comments : string[];

@Prop({ required: true })
...

if (subobject , subSchema):
@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SubType...' })

if array of subobjects:
@Prop({ type: [mongoose.Schema.Types.ObjectId, ref: 'SubType...' }]})

*/

export type NewsDoc = HydratedDocument<NewsEntity>;
export const NewsSchema = SchemaFactory.createForClass(NewsEntity);
/*
import * as mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema({
  //with default mongo _id: { type : ObjectId , alias : "id" } 
  title: String,
  text: String,
  timestamp: String,
});


import { Document } from 'mongoose';
import { News } from './news.itf';
export interface NewsDoc  extends News,  Document  {
  id?:string
}
  */