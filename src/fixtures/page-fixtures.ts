import { ClientPage } from '@pages/client';
import { LoginPage } from '@pages/login';
import { MealPlansPage } from '@pages/meal-plans';
import { test as base } from '@playwright/test';

type PageObjects = {
    loginPage: LoginPage;
    clientPage: ClientPage;
    mealPlanPage: MealPlansPage;
};

export const test = base.extend<PageObjects>({
    loginPage: async ({}, use) => {
        await use(new LoginPage());
    },
    clientPage: async ({}, use) => {
        await use(new ClientPage());
    },
    mealPlanPage: async ({}, use) => {
        await use(new MealPlansPage());
    }
});
