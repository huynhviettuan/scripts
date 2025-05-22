import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { Excel } from './excel.helper';

export function generateRandomString(length = 10): string {
    return faker.string.alpha(length);
}

export function generateRandomNumber(min = 1, max = 100000): number {
    return _.random(min, max);
}

export async function getPlanMealFromFile() {
    const excel = new Excel();
    excel.withFile('meal-plans.xlsx');
    excel.withSheetName('Meal Plan');
    return await excel.readAllDataExceptHeader<{
        mealPlanName: string;
        numberOfWeeks: string;
        owner: string;
        shareWithOrganization?: string;
    }>();
}
