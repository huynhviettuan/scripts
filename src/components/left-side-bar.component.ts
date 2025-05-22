import { $ } from '@common/element.function';
import { Label } from '@elements/common/label';
import { Link } from '@elements/common/link';
import { Locator } from 'playwright-core';

export class LeftSideBar {
    cpnLeftMenuSideBar: Locator;
    cpnAppSideBar: Locator;
    lnkLibrary: Link;
    lblMealPlanTemplates: Label;

    constructor() {
        this.cpnLeftMenuSideBar = $('div.left-menu-sidebar');
        this.cpnAppSideBar = $('div.app-sidebar');
        this.lnkLibrary = new Link({
            parentLocator: this.cpnLeftMenuSideBar,
            label: 'Library'
        });
        this.lblMealPlanTemplates = new Label({
            parentLocator: this.cpnAppSideBar,
            text: 'Meal Plan Templates'
        });
    }

    async openMealPlanTemplates(): Promise<void> {
        await this.lnkLibrary.click();
        await this.cpnAppSideBar.click();
        await this.lblMealPlanTemplates.click();
    }
}
