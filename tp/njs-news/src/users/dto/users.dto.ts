import { AutoMap } from "@automapper/classes";
import { ApiProperty, PartialType } from "@nestjs/swagger";

//as DTO (Data Transfert Object)
//Level0 : username, firstname? ,lastname? , email? , newPassord? , mainGroup?
//Level1 : L0 + id

export class UserL0Dto{

    @ApiProperty({default:'myUsername'})
    @AutoMap()
    public username: string;

    @ApiProperty({default:'myFirstName'})
    @AutoMap()
    public firstName? : string;

    @ApiProperty({default:'myLastName'})
    @AutoMap()
    public lastName? : string;

    @ApiProperty({default:'aaa.bbb@xyz.com'})
    @AutoMap()
    public email? : string ; // | undefined or | null is possible but complex (automapper, ...)
 
    @ApiProperty({default:'pwd'})
    @AutoMap()
    public newPassword? : string;

    @ApiProperty({default:'user_of_sandboxrealm'})
    @AutoMap()
    public mainGroup? : string;
   
    constructor( username : string="myUsername", firstName : string="myFirstName", lastName : string="myLastName" ,
                email : string="aaa.bbb@xyz.com",newPassword : string="pwd",mainGroup : string="user_of_sandboxrealm"){
        this.username=username; this.firstName=firstName; this.lastName=lastName; this.email=email;
        this.newPassword=newPassword; this.mainGroup=mainGroup;
    }
    
}

//NB: PartialType(Xyz) build a typescript type where all properties are optional 
//    (with  @ApiProperty({required:false}))
//bad side-effect: super/constructor is break
export class UserL1Dto  extends UserL0Dto  {

    @ApiProperty()
    @AutoMap()
    public id: string;
        
   
    constructor(id: string="?",
        username : string="myUsername", firstName : string="myFirstName", lastName : string="myLastName" ,
        email : string="aaa.bbb@xyz.com",newPassword : string="pwd",mainGroup : string="user_of_sandboxrealm"){
         super(username,firstName,lastName,email,newPassword,mainGroup);
         this.id=id; 
    }
       
}