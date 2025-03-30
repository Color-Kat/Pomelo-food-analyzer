import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {KafkaModule} from "@app/kafka";
import {ConfigModule} from "@app/config";
import { ScanModule } from './scan/scan.module';

@Module({
    imports: [
        KafkaModule.register('scan'),
        ConfigModule,
        ScanModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
