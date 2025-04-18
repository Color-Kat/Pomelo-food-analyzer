import {IAnalysis} from "@app/interfaces/analysis.interface";

export namespace ProductAnalyzerAnalyzed {
    export const topic = "product-analyzer.analyzed.event";

    export class Payload {
        scanId: string;
        analysisResult: IAnalysis;
    }
}
