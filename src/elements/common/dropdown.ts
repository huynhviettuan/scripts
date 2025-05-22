import { BrowserInstance } from '@common/browser';
import { $ } from '@common/element.function';
import { syncForEach } from '@helpers/helper-functions';
import { ISelect } from '@models/elements/multiselect.interface';
import { Locator, Page } from 'playwright-core';
import { Label } from './label';

export class Dropdown implements ISelect {
    cpnDropdown: Locator;
    lblOption: Label;

    constructor(option?: { label?: string; index?: number; parentLocator?: Locator }) {
        const baseLocator: Page | Locator = option.parentLocator || BrowserInstance.currentPage;
        this.cpnDropdown = option
            ? option.label
                ? baseLocator.locator(`//div[normalize-space()="${option.label}"]/following-sibling::div[1]`)
                : baseLocator.locator('.dropdown').nth(option.index ?? 0)
            : $('.dropdown');
        this.lblOption = new Label({
            parentLocator: this.cpnDropdown,
            locator: 'div[role="option"]'
        });
    }

    async selectOption(option: string, exact?: boolean): Promise<void> {
        await this.cpnDropdown.click();
        exact
            ? await this.lblOption.getByText(option, { exact }).click()
            : await this.lblOption.filter({ hasText: option }).click();
    }

    async getSelectedOption(): Promise<string> {
        return this.cpnDropdown.locator('input').inputValue();
    }

    async getOptions(): Promise<string[]> {
        await this.cpnDropdown.click();
        return await syncForEach(await this.lblOption.element.all(), async (element) =>
            (await element.innerText()).trim()
        );
    }

    async selectOptions(options: string[], exact?: boolean): Promise<void> {
        await syncForEach(options, async (option): Promise<void> => {
            await this.selectOption(option, exact);
        });
    }
}
