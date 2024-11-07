import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "./customer.itf";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { normalize } from "path";

//NB: @ApiProperty() est nécessaire pour une bonne compréhension du schema/DTO par swagger

export class CustomerDto implements Customer {

  @ApiProperty()
  public id?:number;

  @ApiProperty()
  @IsNotEmpty()
  //@Expose({name:"prenom"}) //ancien test temporaire
  public firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  public lastname: string;

  @ApiProperty()
  @IsEmail()
  //@Exclude()  //ancien test temporaire
  public email: string;

  @Expose({name:"mot_de_passe"})
  public password? : string = "pwd007";

  constructor( id:number,firstname: string,lastname: string,email:string ){
    this.id=id ; this.firstname=firstname; this.lastname=lastname;this.email=email
  }

 

  }

   //juste pour tester les fonctionnalités de class-transformer:
  export class CustomerDtoEx extends CustomerDto{

    constructor( id:number,firstname: string,lastname: string,email:string ){
      super(id,firstname,lastname,email);
    }

    asGlobalString(){
      return `[${this.id}] ${this.firstname} ${this.lastname} (${this.email})`
    }

  }




  //juste pour tester les fonctionnalités de class-transformer:
  export class CustomerDtoBis{

    public id?:number;

    @Expose({name:'prenom'})
    public firstname: string;

    @Expose({name:'nom'})  //it's work 2way : plainToClass() and instanceToPlain()
    public lastname: string;

    @Exclude()
    public password : string = "secret";

    @Expose({name:'email'})
    //public getEmail(){   //its also ok 
    public get email(){
      return `${this.firstname}.${this.lastname}@xyz.com`;
    }

    constructor( id:number,firstname: string,lastname: string){
      this.id=id ; this.firstname=firstname; this.lastname=lastname;
    }

    asGlobalString(){
      return `[${this.id}] ${this.firstname} ${this.lastname} `;
    }
  }

   //juste pour tester les fonctionnalités de class-transformer:
  export class CustomerDtoTer{

    public id?:number;

    public prenom: string;

    @Exclude() //it's work 2way : plainToClass() and instanceToPlain() , but not JSON.stringify()
    public password : string = "007";


    public nom: string;

    
    constructor( id:number,prenom: string,nom: string){
      this.id=id ; this.prenom=prenom; this.nom=nom;
    }

    asGlobalString(){
      return `[${this.id}] ${this.prenom} ${this.nom} `;
    }
  }
