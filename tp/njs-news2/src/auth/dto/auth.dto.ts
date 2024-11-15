import { AutoMap } from "@automapper/classes";
import { ApiProperty, PartialType } from "@nestjs/swagger";


export class LoginRequest{

    @ApiProperty({default:'myUsername'})
    @AutoMap()
    public username: string;

    @ApiProperty({default:'pwd'})
    @AutoMap()
    public password : string;

    constructor( username : string="myUsername", password : string="pwd"){
        this.username=username; this.password=password;
    }
    
}

export class LoginResponse{

    @ApiProperty({default:'myUsername'})
    @AutoMap()
    public username: string;

    @ApiProperty({default:'successfull login OR login failed'})
    @AutoMap()
    public message : string;

    @ApiProperty({default:false})
    @AutoMap()
    public status : boolean;

    @ApiProperty({default:null})
    @AutoMap()
    public token : string | null ;

    @ApiProperty({default:null})
    @AutoMap()
    public scope: string | null ;
   
    constructor( username : string="myUsername"){
        this.username=username; 
    }
    
}