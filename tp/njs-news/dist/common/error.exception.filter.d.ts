import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
export declare class ErrorExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost): void;
}
