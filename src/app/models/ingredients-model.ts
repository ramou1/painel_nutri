export interface IngredientsModel {
    id?: string;
    addedSugars?: number;
    dietaryFiber?: number;
    energeticValue?: number;
    favorited?: boolean;
    image?: string;
    proteins?: number;
    quantity?: number;
    restrictions?: any;
    saturatedFat?: number;
    sodium?: number;
    title?: string;
    totalCarbohydrates?: number;
    totalFat?: number;
    totalPortion?: number;
    totalSugars?: number;
    transFats?: number;
    type?: string;
    showIn?: any;
    groups?: any;
}

export interface IngredientGroupsModel {
    id?: string;
    title?: string;
    shortTitle?: string;
    type?: string;
    registerDate?: Date;
    restrictions?: any;
}