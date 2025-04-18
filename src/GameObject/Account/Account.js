import { AccountComponent } from '../../CustomElement/AccountComponent/AccountComponent.js';

export class Account {
    constructor(accountName) {
        this.accountName = accountName;
        this.accountComponent = new AccountComponent(accountName);
        this.balance = 0;
    }

    init(scene, posX, posY, balance) {
        this.accountComponent = this.accountComponent.init(scene, posX, posY, balance);
        return this;
    }

    incrementBalanceBy(difference) {
        this.updateBalance(this.balance + difference);
    }

    decrementBalanceBy(difference) {
        this.updateBalance(this.balance - difference);
    }

    updateBalance(balance) {
        this.balance = balance;
        return this;
    }

    updateComponent() {
        this.accountComponent.update(this.balance);
        return this;
    }

    canWithdraw(amount) {
        return this.balance >= amount;
    }

    getName() {
        return this.accountName;
    }
}
