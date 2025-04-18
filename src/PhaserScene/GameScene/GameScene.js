import { TextColor } from '../../GameProperties/Colors.js';
import { AddTitleText, AddNormalText } from '../../GameProperties/Utils.js';
import { AccountComponent } from '../../CustomElement/AccountComponent/AccountComponent.js';
import { Account } from '../../GameObject/Account/Account.js';

const TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS = 100;

export class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); this.checkingAccount = null; this.highYieldSavingsAccount = null; this.timeAtLastComponentUpdate = new Date().getTime(); }
    preload() { /* game assets */ }
    create() {
        this.checkingAccount = new Account(new AccountComponent('Checking Account')).init(this, 0, 0, 0);
        this.highYieldSavingsAccount = new Account(new AccountComponent('High Yield Savings Account')).init(this, 155, 0, 0);
    }
    update() { /* game loop */
        const currentTime = new Date().getTime();
        if (currentTime - this.timeAtLastComponentUpdate >= TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS) {
            this.timeAtLastComponentUpdate = currentTime;
            this.render();
        }
        this.checkingAccount.incrementBalanceBy(2);
        this.highYieldSavingsAccount.incrementBalanceBy(10);
    }

    render() {
        this.checkingAccount.updateComponent();
        this.highYieldSavingsAccount.updateComponent();
    }
}
