import { Button } from '@elements/common/button';

export class DetailsContainer {
    btnPublish: Button;
    btnUnpublish: Button;
    constructor() {
        this.btnPublish = new Button({
            label: 'Publish'
        });
        this.btnUnpublish = new Button({
            label: 'Unpublish'
        });
    }

    async publish(): Promise<void> {
        await this.btnPublish.click();
    }
}
