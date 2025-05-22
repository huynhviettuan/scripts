import { Button } from '@elements/common/button';
import { Dropdown } from '@elements/common/dropdown';
import { Input } from '@elements/common/input';
import { Modal } from './modal.component';

export class MealPlanModal extends Modal {
    txtMealPlanName: Input;
    txtNumberOfWeeks: Input;
    ddlOwner: Dropdown;
    ddlShareWithOrganization: Dropdown;
    btnCreate: Button;
    btnSave: Button;

    constructor() {
        super();
        this.txtMealPlanName = new Input({
            parentLocator: this.cpnModal,
            name: 'name'
        });
        this.txtNumberOfWeeks = new Input({
            parentLocator: this.cpnModal,
            name: 'numberOfWeeks'
        });
        this.ddlOwner = new Dropdown({
            parentLocator: this.cpnModal,
            label: 'OWNER'
        });
        this.ddlShareWithOrganization = new Dropdown({
            parentLocator: this.cpnModal,
            label: 'SHARE WITH ORG?'
        });
        this.btnCreate = new Button({
            parentLocator: this.cpnModal,
            label: 'Create'
        });
        this.btnSave = new Button({
            parentLocator: this.cpnModal,
            label: 'Save'
        });
    }

    async editMealPlan(
        mealPlan: {
            mealPlanName?: string;
            numberOfWeeks?: string;
            owner?: string;
            shareWithOrganization?: string;
        },
        isAddNew?: boolean
    ): Promise<void> {
        const { mealPlanName, numberOfWeeks, owner, shareWithOrganization } = mealPlan;
        mealPlanName && (await this.txtMealPlanName.fill(mealPlanName));
        numberOfWeeks && (await this.txtNumberOfWeeks.fill(numberOfWeeks));
        owner && (await this.ddlOwner.selectOption(owner));
        shareWithOrganization && (await this.ddlShareWithOrganization.selectOption(shareWithOrganization));
        isAddNew ? await this.btnCreate.click() : await this.btnSave.click();
    }
}
