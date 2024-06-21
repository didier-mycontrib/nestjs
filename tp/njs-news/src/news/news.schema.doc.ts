import * as mongoose from 'mongoose';
export const NewsSchema = new mongoose.Schema({
  title: String,
  text: String,
  timestamp: String,
});

import { Document } from 'mongoose';
import { News } from './news.itf';
export interface NewsDoc  extends News,  Document  {
  id?:string
}