import {Injectable} from "@nestjs/common";
import {IAnalyzerStrategy} from "@product-analyzer/analysis/strategies/analyzer-strategy.interface";
import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";

@Injectable()
export class CosmeticAnalyzerStrategy implements IAnalyzerStrategy {
    analyze(data: ScanIngredientsChanged.Payload) {
        // Logic for cosmetic
    }
}