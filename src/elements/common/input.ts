import { BrowserInstance } from '@common/browser';
import { ITextBox } from '@models/elements/textbox.interface';
import { Locator, Page } from '@playwright/test';
import { Editable } from '../base/editable';

export class Input extends Editable implements ITextBox {
    constructor(option?: {
        parentLocator?: Locator;
        label?: string;
        index?: number;
        locator?: Locator;
        placeholder?: string;
        name?: string;
    }) {
        const baseLocator: Page | Locator = option?.parentLocator || BrowserInstance.currentPage;
        const locator = option?.locator
            ? option.locator
            : option?.label
              ? (() => {
                    const base = baseLocator.getByRole('textbox', { name: option.label! });
                    return option.index !== undefined ? base.nth(option.index) : base;
                })()
              : option?.name
                ? (() => {
                      const base = baseLocator.locator(`input[name="${option.name}"]`);
                      return option.index !== undefined ? base.nth(option.index) : base;
                  })()
                : (() => {
                      const base = baseLocator.locator(
                          option?.placeholder ? `input[placeholder="${option.placeholder}"]` : 'input'
                      );
                      return option?.index !== undefined ? base.nth(option.index) : base;
                  })();
        super(locator);
    }

    public async getValue(): Promise<string> {
        return await this.getAttribute('value');
    }
}
