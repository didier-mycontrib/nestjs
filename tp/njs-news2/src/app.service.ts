import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getApiDescription(): string {
    return 'news-api : REST api for getting news';
  }

  getHtmlApiDescription(): string {
    return `
    <html>
    <head>
       <title>news-api</title>
    </head>
    <body>
      <h1>news-api</h1>
      <hr/>
      <pre>
         REST api for getting news
      <pre/>
    </body>
    </html>
    `;
  }

  /*
  //now replaced by ServeStaticModule ...
  getHtmlAppMainMenu():string{
    return `
    <html>
    <head>
       <title>news</title>
    </head>
    <body>
       <h1>news api</h1>
       <a href="news-api/api" target="_blank" >news api (swagger) description</a><br/>
       <hr/>
       <a href="news-api/news">all news</a><br/>
       <a href="news-api/news/1">news 1</a><br/>
    </body>
    </html>
    `;
  }
  */
}
