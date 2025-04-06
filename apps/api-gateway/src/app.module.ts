import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KafkaModule} from "@app/kafka";
import { ScanModule } from './scan/scan.module';
import {ConfigModule} from "@app/config";
import {HttpModule} from "@nestjs/axios";
import { StorageController } from './storage/storage.controller';
import { StorageModule } from './storage/storage.module';

@Module({
    imports: [
        KafkaModule.register('api-gateway'),
        ConfigModule,
        HttpModule.register({
            global: true
        }),

        ScanModule,
        StorageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

}
