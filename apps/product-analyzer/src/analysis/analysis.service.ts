import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";
import {ScanType} from "@app/interfaces";
import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {IAnalyzerStrategy} from "@product-analyzer/analysis/strategies/analyzer-strategy.interface";
import {CosmeticAnalyzerStrategy} from "@product-analyzer/analysis/strategies/cosmetic-analyzer.strategy";
import {FoodAnalyzerStrategy} from "@product-analyzer/analysis/strategies/food-analyzer.strategy";

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

    analyzeIngredients(data: ScanIngredientsChanged.Payload) {
        const strategy = this.strategies.get(data.type);
        if (!strategy) {
            throw new BadRequestException('Unknown scan type, only FOOD and COSMETIC are supported');
        }
        strategy.analyze(data);
    }
}