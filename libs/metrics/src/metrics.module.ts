import {Global, Module} from '@nestjs/common';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {makeCounterProvider, PrometheusModule} from '@willsoto/nestjs-prometheus';
import {EventMetricsInterceptor} from './event-metrics.interceptor';
import {HttpMetricsInterceptor} from './http-metrics.interceptor';

@Global()
@Module({
    imports: [
        PrometheusModule.register({
            path: '/metrics',
            defaultMetrics: { enabled: true },
        }),
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpMetricsInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: EventMetricsInterceptor,
        },
        makeCounterProvider({
            name: 'http_requests_total',
            help: 'Total number of HTTP requests',
            labelNames: ['method', 'path', 'status'],
        }),
        makeCounterProvider({
            name: 'event_messages_total',
            help: 'Total number of processed events or messages',
            labelNames: ['transport', 'topic'],
        }),
    ],
    exports: [PrometheusModule],
})
export class MetricsModule {}