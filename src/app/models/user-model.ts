export interface UserModel {
    name?: string;
    phone?: any;
    email?: any;
    gender?: string;
    id?: string;
    age?: number;
    preferences?: any[];
    restrictions?: any[];
    activityLevel?: number;
    objective?: number;
    password?: any;
    registerDate?: Date;
    role?: string;
    height?: WeightModel;
    desiredWeight?: number;
    desiredWeightLossByWeek?: number;
    mealsADay?: any[];
    weight?: number;
    waist?: WaistModel;
    abdomen?: number;
    level?: number;
    coins?: number;
    tmb?: number;
    get?: number;
    deficit?: number;
    signature?: SignatureModel;
}

export interface WeightModel {
    // registerDate?: Date;
    registerDate?: any;
    weightType?: string;
    value?: number;
}

export interface WaistModel {
    registerDate?: Date;
    value?: number;
}

export interface SignatureModel {
    gym?: any;
    plan?: PlanModel;
    // card?: CardModel;
}

export interface PlanModel {
    description?: string;
    discount?: number;
    type?: string;
    value?: number;
    expiration?: string;
    status?: string;
}