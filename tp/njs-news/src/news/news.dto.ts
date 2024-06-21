import { ApiProperty } from "@nestjs/swagger";

//as DTO (Data Transfert Object)
export class NewsDto{

    @ApiProperty()
    public id: string;

    @ApiProperty()
    public title: string;

    @ApiProperty()
    public text : string;
        
    @ApiProperty()
    public timestamp : string;

    constructor(id: string,title: string, text : string, timestamp : string){
        this.id=id; this.title=title; this.text=text; this.timestamp=timestamp;
    }
}