import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KafkaModule} from "@app/kafka";
import { ScanModule } from './scan/scan.module';
import {ConfigModule} from "@app/config";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        KafkaModule.register('api-gateway'),
        ConfigModule,
        HttpModule.register({
            global: true
        }),

        ScanModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

}
