import { Button } from '@elements/common/button';
import { Modal } from './modal.component';

export class RemoveMealPlanModal extends Modal {
    btnRemove: Button;

    constructor() {
        super();
        this.btnRemove = new Button({
            parentLocator: this.cpnModal,
            label: 'Remove'
        });
    }

    async remove(): Promise<void> {
        await this.btnRemove.click();
    }
}
