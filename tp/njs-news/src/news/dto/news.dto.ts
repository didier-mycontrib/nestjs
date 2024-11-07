import { AutoMap } from "@automapper/classes";
import { ApiProperty, PartialType } from "@nestjs/swagger";

//as DTO (Data Transfert Object)
//Level0 : title, text ,timestamp?
//Level1 : L0 + id

export class NewsL0Dto{

    @ApiProperty({default:'newsTitle'})
    @AutoMap()
    public title: string;

    @ApiProperty({default:'text of news'})
    @AutoMap()
    public text : string;

    @ApiProperty({required:false , default: (new Date()).toISOString()})
    @AutoMap()
    public timestamp? : string ; // | undefined or | null is possible but complex (automapper, ...)
 
   
    constructor( title : string="?", text : string="?" , timestamp : string="?"){
        this.title=title; this.text=text; this.timestamp=timestamp;
    }
    
}

//NB: PartialType(Xyz) build a typescript type where all properties are optional 
//    (with  @ApiProperty({required:false}))
//bad side-effect: super/constructor is break
export class NewsL1Dto  extends NewsL0Dto  {

    @ApiProperty()
    @AutoMap()
    public id: string;
        
   
    constructor(id: string="?",title: string="?", text : string="?",timestamp : string="?"){
        super(title,text,timestamp);
        this.id=id; 
    }
       
}