import {ConfigModule} from "@app/config";
import {KafkaModule} from "@app/kafka";
import {Module} from '@nestjs/common';
import {DatabaseModule} from "@scan/database/database.module";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CacheModule} from "@app/cache";
import { AnalysisModule } from './analysis/analysis.module';

@Module({
    imports: [
        KafkaModule.register('product-analyzer'),
        ConfigModule,
        DatabaseModule,
        CacheModule,
        AnalysisModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
