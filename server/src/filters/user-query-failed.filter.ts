import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class UserQueryFailedExceptionFilter implements ExceptionFilter {
    host?: ArgumentsHost;

    catch(exception: QueryFailedError, host: ArgumentsHost) {
        this.host = host;

        switch ((exception as any).code) {
            case '23505':
                this.sendResponse(HttpStatus.CONFLICT, 'Username already exists.');
                break;
            case '23502':
                this.sendResponse(HttpStatus.BAD_REQUEST, `${(exception as any).column} is required.`);
                break;
            default:
                this.sendResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred.', exception);
        }
    }

    sendResponse(status, message, err?) {
        const ctx = this.host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response
            .status(status)
            .json({
                statusCode: status,
                message,
                err
            });
    }
}