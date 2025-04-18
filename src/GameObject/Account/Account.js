import { AccountComponent } from '../../CustomElement/AccountComponent/AccountComponent.js';

export class Account {
    constructor(accountName, interest, intervalInMilliseconds, lockWhileInteresting = false) {
        this.accountName = accountName;
        this.accountComponent = new AccountComponent(accountName, interest, intervalInMilliseconds, lockWhileInteresting);
        this.balance = 0;
        this.interest = interest;
        this.intervalInMilliseconds = intervalInMilliseconds;
        this.lastTime = new Date().getTime();
        this.locked = false;
        this.lockWhileInteresting = lockWhileInteresting;
        this.currentTermPeriodInstanceInMilliseconds = 0;
    }

    init(scene, posX, posY, balance) {
        this.balance = balance;
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
        if(this.lockWhileInteresting) {
            this.accountComponent.updateTermPeriodText(this.currentTermPeriodInstanceInMilliseconds);
        }
        return this;
    }

    updateByInterest() {
        const currentTime = new Date().getTime();

        this.currentTermPeriodInstanceInMilliseconds = currentTime - this.lastTime;
        if (this.currentTermPeriodInstanceInMilliseconds >= this.intervalInMilliseconds / 4 && !this.locked && this.lockWhileInteresting) {
            this.setLocked(true);
        }

        if (this.currentTermPeriodInstanceInMilliseconds >= this.intervalInMilliseconds) {
            this.lastTime = currentTime;
            this.updateBalance(this.balance * (1 + this.interest));
            if(this.lockWhileInteresting) {
                this.setLocked(false);
            }
        }
        return this;
    }

    setLocked(locked) {
        this.locked = locked;
        if(locked) {
            this.accountComponent.lock();
        }
        else if(!locked) {
            this.accountComponent.unlock();
        }
    }

    isLocked() {
        return this.locked;
    }

    canWithdraw(amount) {
        return this.balance >= amount;
    }

    getName() {
        return this.accountName;
    }
}
