import {ScanIngredientsChanged} from "@app/contracts/scan/scan.ingredients-changed";

export interface IAnalyzerStrategy {
    analyze(data: ScanIngredientsChanged.Payload): void;
}