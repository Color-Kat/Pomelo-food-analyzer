export interface IngredientDetails {
    ingredient: {};
    allergens: string[];
    hasSugar: boolean;
}

export interface IAnalysis {
    scanId: string;
    healthIndex: number;
    ingredientsDetails: Record<string, IngredientDetails>;
}