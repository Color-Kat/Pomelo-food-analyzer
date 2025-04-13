import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";
import {IAnalysis} from "@app/interfaces";

export interface IAnalyzerStrategy {
    analyze(data: ScanIngredientsChanged.Payload): Promise<IAnalysis>;
}