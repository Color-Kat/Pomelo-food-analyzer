import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {AxiosError} from "axios";
import {Response} from "express";

@Catch(AxiosError)
export class AxiosHttpExceptionFilter implements ExceptionFilter {
    catch(exception: AxiosError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.response?.status || 500;

        if (exception.response?.data) {
            response.status(status).json(exception.response?.data);
        } else
            response.status(status).json({
                statusCode: status,
                message: 'Something went wrong',
                error: 'Bad Request',
            });
    }
}