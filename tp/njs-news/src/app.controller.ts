import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//default controller without name ---> localhost:3000 or localhost:3000/news-api
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
/*
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
    */


  @Get()
  getApiDescription(): string {
    //return this.appService.getApiDescription();
    return this.appService.getHtmlApiDescription();
  }

 

/*
  @Get()
  getMainMenu(): string {
    return this.appService.getHtmlAppMainMenu();
  }
*/

}
