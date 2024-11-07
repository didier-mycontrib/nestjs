import { HydratedDocument } from 'mongoose';
export declare class NewsEntity {
    id: string;
    title: string;
    text: string;
    timestamp?: string;
}
export type NewsDoc = HydratedDocument<NewsEntity>;
export declare const NewsSchema: import("mongoose").Schema<NewsEntity, import("mongoose").Model<NewsEntity, any, any, any, import("mongoose").Document<unknown, any, NewsEntity> & NewsEntity & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NewsEntity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<NewsEntity>> & import("mongoose").FlatRecord<NewsEntity> & {
    _id: import("mongoose").Types.ObjectId;
}>;
