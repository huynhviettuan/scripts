import { $ } from '@common/element.function';
import { Locator } from 'playwright-core';
import { Label } from './label';

export class DropdownMenu {
    cpnDropdownMenu: Locator;
    lblOption: Label;

    constructor(parentLocator?: Locator) {
        this.cpnDropdownMenu = parentLocator
            ? parentLocator.locator('div.evf-dropdown__menu')
            : $('div.evf-dropdown__menu');
        this.lblOption = new Label({
            parentLocator: this.cpnDropdownMenu,
            locator: 'div.evf-dropdown__option'
        });
    }

    async selectOption(option: string, exact?: boolean): Promise<void> {
        exact
            ? await this.lblOption.getByText(option, { exact }).click()
            : await this.lblOption.filter({ hasText: option }).click();
    }
}
