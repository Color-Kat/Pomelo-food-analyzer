export namespace IngredientsRecognitionRecognized {
    export const topic = "ingredients-recognition.recognized.event";

    export class Payload {
        scanId: string;
        ingredients: string[];
    }
}
