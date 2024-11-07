import { Column, Entity, ObjectId , ObjectIdColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

@Entity("news")
export class NewsEntity  {

    @ObjectIdColumn()
    @AutoMap()
    id: string ;

    @Column()
    @AutoMap()
    title: string;
  
    @Column()
    @AutoMap()
    text: string;
  
    @Column()
    @AutoMap()
    timestamp?: string;
  }