import { LeftSideBar } from '@components/left-side-bar.component';

export class ClientPage {
    leftSideBar: LeftSideBar;
    constructor() {
        this.leftSideBar = new LeftSideBar();
    }
}
