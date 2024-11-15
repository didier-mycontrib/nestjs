import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity("users")
export class UserEntity  {

  @ObjectIdColumn()
  @AutoMap()
  id:string;

  @Column()
  @AutoMap()
  username: string;

  @Column()
  @AutoMap() 
  firstName?: string;

  @Column()
  @AutoMap() 
  lastName?: string;

  @Column()
  @AutoMap()
  email?: string ; //? ok but | null or |undefined are problematic , may be null at runtime ?

  @Column() 
  @AutoMap() 
  newPassword?: string;

  @Column() 
  @AutoMap() 
  mainGroup?: string;
}
