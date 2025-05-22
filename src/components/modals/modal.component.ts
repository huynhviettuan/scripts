import { $ } from '@common/element.function';
import { Button } from '@elements/common/button';
import { Locator } from 'playwright-core';

export class Modal {
    cpnModal: Locator;
    btnClose: Button;

    constructor() {
        this.cpnModal = $('.modal');
    }
}
