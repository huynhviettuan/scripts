import { BrowserInstance } from '@common/browser';
import { ENDPOINTS } from '@constants/endpoints.constant';
import { MealPlanOwnerEnum, MealPlanStatus, ShareWithOrganizationEnum } from '@enums/meal-plan.enum';
import { test } from '@fixtures/fixtures';
import { generateRandomNumber } from '@helpers/generate-data-functions';
import { resolveAll } from '@helpers/helper-functions';
import { expect } from '@playwright/test';

test.describe('Login', async () => {
    let mealPlan: {
        mealPlanName: string;
        numberOfWeeks: string;
        owner: string;
        shareWithOrganization: string;
    };

    test.beforeEach(async ({ clientPage, loginPage }) => {
        mealPlan = {
            mealPlanName: `Test Meal Plan${generateRandomNumber()}`,
            numberOfWeeks: generateRandomNumber(1, 10).toString(),
            owner: MealPlanOwnerEnum.GUEST,
            shareWithOrganization: ShareWithOrganizationEnum.SHARED_WITH_OTHERS
        };
        await BrowserInstance.currentPage.goto(ENDPOINTS.SIGN_IN);
        await loginPage.login();
        await clientPage.leftSideBar.openMealPlanTemplates();
    });

    test('Verify user can create draft meal plan', async ({ mealPlanPage }) => {
        await mealPlanPage.createNewMealPlan(mealPlan);
        await resolveAll([
            expect(mealPlanPage.navBar.lblMealPlanName.element).toHaveText(mealPlan.mealPlanName),
            expect(mealPlanPage.navBar.lblMealPlanStatus.element).toHaveText(MealPlanStatus.DRAFT)
        ]);
    });

    test('Verify user can edit meal plan info', async ({ mealPlanPage }) => {
        const editMealPlan = {
            mealPlanName: `Test Meal Plan${generateRandomNumber()}`,
            owner: MealPlanOwnerEnum.NO_OWNER
        };
        await mealPlanPage.createNewMealPlan(mealPlan);
        await mealPlanPage.editMealPlan(editMealPlan);
        await resolveAll([
            expect(mealPlanPage.toastMessage.cpnToastMessage).toHaveText('Successfully updated.'),
            expect(mealPlanPage.navBar.lblMealPlanName.element).toHaveText(editMealPlan.mealPlanName),
            expect(mealPlanPage.navBar.lblMealPlanStatus.element).toHaveText(MealPlanStatus.DRAFT)
        ]);
    });

    test('Verify user can publish meal plan', async ({ mealPlanPage }) => {
        await mealPlanPage.createNewMealPlan(mealPlan);
        await mealPlanPage.mealPlanDetails.publish();
        await resolveAll([
            expect(mealPlanPage.toastMessage.cpnToastMessage).toHaveText(
                'Meal Plan has been published. You can start assigning clients to it now.'
            ),
            expect(mealPlanPage.navBar.lblMealPlanStatus.element).toHaveText(MealPlanStatus.PUBLISHED),
            expect(mealPlanPage.mealPlanDetails.btnPublish.element).toBeHidden(),
            expect(mealPlanPage.mealPlanDetails.btnUnpublish.element).toBeVisible()
        ]);
    });

    test('Verify user can remove draft meal plan', async ({ mealPlanPage }) => {
        await mealPlanPage.createNewMealPlan(mealPlan);
        await mealPlanPage.leftSideBar.lblMealPlanTemplates.click();
        await mealPlanPage.lblDraft.click();
        await mealPlanPage.removePlanMeal(mealPlan.mealPlanName);
        await expect(mealPlanPage.getPlanMealCardLocator(mealPlan.mealPlanName)).toBeHidden();
    });

    test('Verify user can duplicate meal plan', async ({ mealPlanPage }) => {
        await mealPlanPage.createNewMealPlan(mealPlan);
        await mealPlanPage.leftSideBar.lblMealPlanTemplates.click();
        await mealPlanPage.lblDraft.click();
        await mealPlanPage.duplicatePlanMeal(mealPlan.mealPlanName);
        await resolveAll([
            expect(mealPlanPage.navBar.lblMealPlanName.element).toHaveText(`Copied - ${mealPlan.mealPlanName}`),
            expect(mealPlanPage.navBar.lblMealPlanStatus.element).toHaveText(MealPlanStatus.DRAFT)
        ]);
    });
});
