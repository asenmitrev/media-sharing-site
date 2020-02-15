import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class GenericQueryFailedExceptionFilter implements ExceptionFilter {
    host?: ArgumentsHost;

    catch(exception: QueryFailedError, host: ArgumentsHost) {
        this.host = host;
console.log(exception)
        switch ((exception as any).code) {
            case '23505':
                this.sendResponse(HttpStatus.CONFLICT, 'Conflict in unique constraint.');
                break;
            case '23502':
                this.sendResponse(HttpStatus.BAD_REQUEST, `${(exception as any).column} is required.`);
                break;
            case '22P02':
                this.sendResponse(HttpStatus.BAD_REQUEST, exception.message);
                break;
            default:
                this.sendResponse(HttpStatus.INTERNAL_SERVER_ERROR, process.env.MODE === 'PROD' ? 'An error occurred.' : exception.message);
        }
    }

    sendResponse(status, message) {
        const ctx = this.host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response
            .status(status)
            .json({
                statusCode: status,
                message
            });
    }
}