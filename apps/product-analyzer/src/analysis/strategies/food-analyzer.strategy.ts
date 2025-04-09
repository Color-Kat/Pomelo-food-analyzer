import {Injectable} from "@nestjs/common";
import {IAnalyzerStrategy} from "@product-analyzer/analysis/strategies/analyzer-strategy.interface";
import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";

@Injectable()
export class FoodAnalyzerStrategy implements IAnalyzerStrategy {
    analyze(data: ScanIngredientsChanged.Payload) {
        // Logic for FOOD
        console.log(data, 'Process food');
    }
}