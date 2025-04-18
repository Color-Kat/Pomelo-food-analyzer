import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";
import {IAnalysis} from "@app/interfaces";
import {Injectable} from "@nestjs/common";
import {IAnalyzerStrategy} from "@product-analyzer/analysis/strategies/analyzer-strategy.interface";

@Injectable()
export class CosmeticAnalyzerStrategy implements IAnalyzerStrategy {
    async analyze(data: ScanIngredientsChanged.Payload): Promise<IAnalysis> {
        // Logic for FOOD
        console.log(data, 'Process cosmetic');

        // Simulate some analysis logic
        return {
            scanId: data.scanId,
            healthIndex: 40,
            ingredientsDetails: {}
        }
    }
}