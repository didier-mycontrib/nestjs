import { HydratedDocument } from 'mongoose';
export declare class UserEntity {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    newPassword?: string;
    mainGroup?: string;
}
export type UserDoc = HydratedDocument<UserEntity>;
export declare const UserSchema: import("mongoose").Schema<UserEntity, import("mongoose").Model<UserEntity, any, any, any, import("mongoose").Document<unknown, any, UserEntity> & UserEntity & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserEntity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserEntity>> & import("mongoose").FlatRecord<UserEntity> & {
    _id: import("mongoose").Types.ObjectId;
}>;
