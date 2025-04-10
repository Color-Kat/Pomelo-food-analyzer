import {CacheModule} from "@app/cache";
import {ConfigModule} from "@app/config";
import {KafkaModule} from "@app/kafka";
import {MetricsModule} from "@app/metrics";
import {Module} from '@nestjs/common';
import {AdditiveModule} from "@product-analyzer/additive/additive.module";
import {DatabaseModule} from "@product-analyzer/database/database.module";
import {AnalysisModule} from './analysis/analysis.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
    imports: [
        KafkaModule.register('product-analyzer'),
        ConfigModule,
        DatabaseModule,
        CacheModule,
        MetricsModule,

        AnalysisModule,
        AdditiveModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
