import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose'


@Schema()
export class UserEntity  {

  //default @Prop  mongo _id: { type : ObjectId , alias : "id" } 
  id:string;

  @Prop() 
  @AutoMap()
  username: string;

  @Prop() 
  @AutoMap() 
  firstName?: string;

  @Prop() 
  @AutoMap() 
  lastName?: string;

  @Prop() 
  @AutoMap()
  email?: string ; //? ok but | null or |undefined are problematic , may be null at runtime ?

  @Prop() 
  @AutoMap() 
  newPassword?: string;

  @Prop() 
  @AutoMap() 
  mainGroup?: string;
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

export type UserDoc = HydratedDocument<UserEntity>;
export const UserSchema = SchemaFactory.createForClass(UserEntity);
