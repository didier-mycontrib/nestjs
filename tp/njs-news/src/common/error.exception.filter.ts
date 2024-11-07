
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';


//pour traiter throw new HttpException('no yyy for id='+id, HttpStatus.NOT_FOUND);
//ou bien throw new HttpException('yyy', HttpStatus.YYYY);
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        //const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
    
        response
          .status(status)
          .json({
            statusCode: status,
            //timestamp: new Date().toISOString(),
            //path: request.url,
            message : exception.message
          });
      }
}


//pour traiter throw new Error(`NOT_FOUND: news not found with id=${id}`);
//ou bien  throw new Error(`XXX: message_xxx`);
@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {

    console.log("**** ErrorExceptionFilter ****")

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();
    const fullMessage = error.message;
    const messageParts = fullMessage.split(':');
    const message = messageParts.length>1?messageParts[1].trim():fullMessage;
    const statusString = messageParts.length>1?messageParts[0]:null;
    let status = HttpStatus.INTERNAL_SERVER_ERROR; //by default
    switch(statusString){
        case "NOT_FOUND" : status = HttpStatus.NOT_FOUND; break;
        //...
    }

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        //path: request.url,
        message:message
      });
  }
}
