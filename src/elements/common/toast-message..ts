import { $ } from '@common/element.function';
import { Locator } from 'playwright-core';

export class ToastMessage {
    cpnToastMessage: Locator;
    constructor() {
        this.cpnToastMessage = $('div.Toastify');
    }
}
