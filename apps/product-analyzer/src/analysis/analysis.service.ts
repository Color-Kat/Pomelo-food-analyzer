import {ProductAnalyzerAnalyzed} from "@app/contracts";
import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";
import {ScanType} from "@app/interfaces";
import {Inject, Injectable} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {IAnalyzerStrategy} from "@product-analyzer/analysis/strategies/analyzer-strategy.interface";
import {CosmeticAnalyzerStrategy} from "@product-analyzer/analysis/strategies/cosmetic-analyzer.strategy";
import {FoodAnalyzerStrategy} from "@product-analyzer/analysis/strategies/food-analyzer.strategy";

@Injectable()
export class AnalysisService {
    private strategies: Map<ScanType, IAnalyzerStrategy>;

    constructor(
        @Inject(FoodAnalyzerStrategy) foodStrategy: FoodAnalyzerStrategy,
        @Inject(CosmeticAnalyzerStrategy) cosmeticStrategy: CosmeticAnalyzerStrategy,
        @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
    ) {
        this.strategies = new Map([
            [ScanType.FOOD, foodStrategy],
            [ScanType.COSMETIC, cosmeticStrategy],
        ]);
    }

    private emitStatus(scanId: string, status: ScanStatusChanged.StatusEnum) {
        this.kafkaService.emit<void, ScanStatusChanged.Payload>(ScanStatusChanged.topic, {
            scanId,
            status,
        });
    }

    async analyzeIngredients(data: ScanIngredientsChanged.Payload) {
        try {
            // Emit the ANALYZING status
            this.emitStatus(data.scanId, ScanStatusChanged.StatusEnum.ANALYZING);

            // Get strategy for analyzing by scan type
            const strategy = this.strategies.get(data.type);
            if (!strategy) throw new Error(
                'Unknown scan type, only FOOD and COSMETIC are supported'
            );

            // Analyze the data
            const result = await strategy.analyze(data);

            // Emit the analysis result
            this.kafkaService.emit<void, ProductAnalyzerAnalyzed.Payload>(ProductAnalyzerAnalyzed.topic, {
                scanId: data.scanId,
                analysisResult: result
            });
        } catch (error) {
            // Handle the error and emit a failure status
            setTimeout(() => {
                this.emitStatus(data.scanId, ScanStatusChanged.StatusEnum.ANALYSIS_FAILED);
            }, 50);

            console.warn("Error during analysis:", error, "Retry to analyze");
            throw new Error(error);
        }
    }
}