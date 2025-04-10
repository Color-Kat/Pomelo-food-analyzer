import {ConfigModule} from "@app/config";
import {KafkaModule} from "@app/kafka";
import {MetricsModule} from "@app/metrics";
import {HttpModule} from "@nestjs/axios";
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ScanModule} from './scan/scan.module';
import {StorageModule} from './storage/storage.module';

@Module({
    imports    : [
        KafkaModule.register('api-gateway'),
        ConfigModule,
        MetricsModule,
        HttpModule.register({
            global: true
        }),

        ScanModule,
        StorageModule,
    ],
    controllers: [AppController],
    providers  : [AppService],
})
export class AppModule {

}
