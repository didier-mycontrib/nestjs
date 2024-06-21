import * as mongoose from 'mongoose';
export declare const NewsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title?: string | null | undefined;
    text?: string | null | undefined;
    timestamp?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    title?: string | null | undefined;
    text?: string | null | undefined;
    timestamp?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    title?: string | null | undefined;
    text?: string | null | undefined;
    timestamp?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
import { Document } from 'mongoose';
import { News } from './news.itf';
export interface NewsDoc extends News, Document {
    id?: string;
}
