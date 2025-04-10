import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {InjectMetric} from '@willsoto/nestjs-prometheus';
import {Counter} from 'prom-client';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
    constructor(
        @InjectMetric('http_requests_total') private readonly counter: Counter<string>,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Skip if not http
        if (context.getType() !== 'http') {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const path = request.url;

        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse();
                this.counter.inc({ method, path, status: response.statusCode });
            }),
        );
    }
}