import { $ } from '@common/element.function';
import { EMAIL, PASSWORD } from '@constants/config.constant';
import { Button } from '@elements/common/button';
import { Input } from '@elements/common/input';
import { Locator } from 'playwright-core';

export class LoginPage {
    cpnLoginContainer: Locator;
    txtEmailAddress: Input;
    txtPassword: Input;
    btnLogin: Button;

    constructor() {
        this.cpnLoginContainer = $('.login-container');
        this.txtEmailAddress = new Input({
            parentLocator: this.cpnLoginContainer,
            label: 'Your Email Address'
        });
        this.txtPassword = new Input({
            parentLocator: this.cpnLoginContainer,
            label: 'Password'
        });
        this.btnLogin = new Button({
            parentLocator: this.cpnLoginContainer,
            label: 'Login'
        });
    }

    async login(email = EMAIL, password = PASSWORD): Promise<void> {
        await this.txtEmailAddress.fill(email);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }
}
