import { TextColor } from '../../GameProperties/Colors.js';
import { AddTitleText, AddNormalText } from '../../GameProperties/Utils.js';
import { AccountComponent } from '../../CustomElement/AccountComponent/AccountComponent.js';
import { Account } from '../../GameObject/Account/Account.js';
import { OperationableAccount } from '../../GameObject/Account/OperationableAccount.js';

const TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS = 100;

export class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); this.checkingAccount = null; this.highYieldSavingsAccount = null; this.timeAtLastComponentUpdate = new Date().getTime(); }
    preload() { /* game assets */ }
    create() {
        const self = this;
        this.checkingAccount = new Account(new AccountComponent('Checking Account')).init(this, 150, 100, 0);
        this.highYieldSavingsAccount = new OperationableAccount(new AccountComponent('High Yield Savings Account'))
        .init(this, 450, 100, 0)
        .addDepositCallback((amount) => {
            self.checkingAccount.decrementBalanceBy(amount);
        })
        .addWithdrawCallback((amount) => {
            self.checkingAccount.incrementBalanceBy(amount);
        })
        .addDepositCondition((amount) => {
            return self.checkingAccount.canWithdraw(amount);
        }, "Checking Account funds are insufficient!");
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
