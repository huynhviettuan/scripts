import { $ } from '@common/element.function';
import { Button } from '@elements/common/button';
import { Label } from '@elements/common/label';
import { Locator } from 'playwright-core';

export class NavBar {
    cpnNavBar: Locator;
    cpnNavBarLeft: Locator;
    cpnNavBarRight: Locator;
    btnEditInfo: Button;
    lblMealPlanName: Label;
    lblMealPlanStatus: Label;

    constructor() {
        this.cpnNavBar = $('div.app-navbar');
        this.cpnNavBarLeft = this.cpnNavBar.locator('div.app-navbar__left');
        this.cpnNavBarRight = this.cpnNavBar.locator('div.app-navbar__right');
        this.btnEditInfo = new Button({
            parentLocator: this.cpnNavBarLeft,
            label: 'Edit Info'
        });
        this.lblMealPlanName = new Label({
            parentLocator: this.btnEditInfo.getParent(),
            locator: 'span'
        });
        this.lblMealPlanStatus = new Label({
            parentLocator: this.btnEditInfo.getParent(),
            locator: 'div'
        });
    }
}
