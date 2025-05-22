import { $, $getByText } from '@common/element.function';
import { LeftSideBar } from '@components/left-side-bar.component';
import { MealPlanModal } from '@components/modals/meal-plan-modal.component';
import { RemoveMealPlanModal } from '@components/modals/remove-meal-plan-modal.component';
import { NavBar } from '@components/navbar.component';
import { DropdownMenu } from '@elements/common/dropdown-menu';
import { Label } from '@elements/common/label';
import { ToastMessage } from '@elements/common/toast-message.';
import { Locator } from 'playwright-core';
import { DetailsContainer } from './details.container';

export class MealPlansPage {
    readonly mealPlanAction = {
        DUPLICATE: 'Duplicate',
        REMOVE: 'Remove'
    };

    leftSideBar: LeftSideBar;
    navBar: NavBar;
    mealPlanDetails: DetailsContainer;
    toastMessage: ToastMessage;
    createMealPlanModal: MealPlanModal;
    removeMealPlanModal: RemoveMealPlanModal;
    lblCreateNewPlan: Label;
    lblDraft: Label;

    constructor() {
        this.leftSideBar = new LeftSideBar();
        this.navBar = new NavBar();
        this.mealPlanDetails = new DetailsContainer();
        this.toastMessage = new ToastMessage();
        this.createMealPlanModal = new MealPlanModal();
        this.removeMealPlanModal = new RemoveMealPlanModal();
        this.lblCreateNewPlan = new Label({
            text: 'Create Meal Plan'
        });
        this.lblDraft = new Label({
            text: 'Draft'
        });
    }

    getPlanMealCardLocator(mealPlanName: string): Locator {
        return $('div.image-with-fallback').locator('..', { has: $getByText(mealPlanName) });
    }

    async createNewMealPlan(mealPlan: {
        mealPlanName: string;
        numberOfWeeks: string;
        owner: string;
        shareWithOrganization?: string;
    }): Promise<void> {
        await this.lblCreateNewPlan.click();
        await this.createMealPlanModal.editMealPlan(mealPlan, true);
    }

    async editMealPlan(mealPlan: {
        mealPlanName?: string;
        owner?: string;
        shareWithOrganization?: string;
    }): Promise<void> {
        await this.navBar.btnEditInfo.click();
        await this.createMealPlanModal.editMealPlan(mealPlan);
    }

    async triggerPlanMealCardAction(mealPlanName: string, action: string): Promise<void> {
        await this.getPlanMealCardLocator(mealPlanName).hover();
        await this.getPlanMealCardLocator(mealPlanName).locator('div.evf-dropdown__trigger-container').click();
        const dropdownMenu = new DropdownMenu(this.getPlanMealCardLocator(mealPlanName));
        await dropdownMenu.selectOption(action);
    }

    async removePlanMeal(mealPlanName: string): Promise<void> {
        await this.triggerPlanMealCardAction(mealPlanName, this.mealPlanAction.REMOVE);
        await this.removeMealPlanModal.remove();
    }

    async duplicatePlanMeal(mealPlanName: string): Promise<void> {
        await this.triggerPlanMealCardAction(mealPlanName, this.mealPlanAction.DUPLICATE);
    }
}
