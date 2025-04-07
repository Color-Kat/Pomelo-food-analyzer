import {ScanType} from "@app/interfaces";

export namespace ScanIngredientsChanged {
    export const topic = "scan.ingredients-changed.event";

    export class Payload {
        scanId: string;
        type: ScanType;
        ingredients: string[];
    }
}
