import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {ScanType} from "@app/interfaces";
import {IAnalyzerStrategy} from "@product-analyzer/analysis/strategies/analyzer-strategy.interface";
import {FoodAnalyzerStrategy} from "@product-analyzer/analysis/strategies/food-analyzer.strategy";
import {CosmeticAnalyzerStrategy} from "@product-analyzer/analysis/strategies/cosmetic-analyzer.strategy";
import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";

@Injectable()
export class AnalysisService {
    private strategies: Map<ScanType, IAnalyzerStrategy>;

    constructor(
        @Inject(FoodAnalyzerStrategy) foodStrategy: FoodAnalyzerStrategy,
        @Inject(CosmeticAnalyzerStrategy) cosmeticStrategy: CosmeticAnalyzerStrategy,
    ) {
        this.strategies = new Map([
            [ScanType.FOOD, foodStrategy],
            [ScanType.COSMETIC, cosmeticStrategy],
        ]);
    }

    handleScan(data: ScanIngredientsChanged.Payload) {
        const strategy = this.strategies.get(data.type);
        if (!strategy) {
            throw new BadRequestException('Unknown scan type, only FOOD and COSMETIC are supported');
        }
        strategy.analyze(data);
    }
}