import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {KafkaContext} from "@nestjs/microservices";
import {InjectMetric} from '@willsoto/nestjs-prometheus';
import {Counter} from 'prom-client';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class EventMetricsInterceptor implements NestInterceptor {
    constructor(
        @InjectMetric('event_messages_total') private readonly counter: Counter<string>,
    ) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const type = context.getType();

        // Skip if not rpc microservice (@EventPattern, @MessagePattern)
        if (type !== 'rpc') {
            return next.handle();
        }

        const ctx = context.switchToRpc().getContext<KafkaContext>();

        const topic = ctx.getTopic();
        // const producer = ctx.getProducer();
        // const consumer = ctx.getConsumer();
        // const message = ctx.getMessage();

        return next.handle().pipe(
            tap(() => {
                this.counter.inc({
                    transport: "KAFKA",
                    topic,
                });
            }),
        );
    }
}