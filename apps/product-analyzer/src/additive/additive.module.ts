import {Module} from '@nestjs/common';
import {AdditiveService} from './additive.service';
import {AdditiveController} from './additive.controller';
import {AnalysisRepository} from "@product-analyzer/analysis/analysis.repository";

@Module({
    controllers: [AdditiveController],
    providers: [AdditiveService, AnalysisRepository],
})
export class AdditiveModule {
}
