import { IngredientsModel } from "./ingredients-model";

export interface RecipesModel {
    id?: string;
    favorited?: boolean;
    title?: string;
    description?: string;
    image?: null;
    addedSugars?: number;
    dietaryFiber?: number;
    energeticValue?: number;
    proteins?: number;
    usedIn?: any;
    saturatedFat?: number;
    sodium?: number;
    totalCarbohydrates?: number;
    totalFat?: number;
    totalPortion?: number;
    totalSugars?: number;
    transFats?: number;
    registerDate?: Date;
    restrictions?: any;
    ingredientsIds?: any;
    ingredients?: [IngredientsModel];
}