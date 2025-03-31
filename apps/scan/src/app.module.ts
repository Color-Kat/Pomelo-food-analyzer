import {ConfigModule} from "@app/config";
import {KafkaModule} from "@app/kafka";
import {Module} from '@nestjs/common';
import {DatabaseModule} from "@scan/database/database.module";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ScanModule} from './scan/scan.module';

@Module({
    imports: [
        KafkaModule.register('scan'),
        ConfigModule,
        DatabaseModule,
        ScanModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
