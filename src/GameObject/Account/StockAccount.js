import { OperationableAccount } from './OperationableAccount.js';

export class StockAccount extends OperationableAccount {
    constructor(accountName, interest, intervalInMilliseconds, lockWhileInteresting = false, baseLuckFactor = 1) {
        super(accountName, interest, intervalInMilliseconds, lockWhileInteresting, false);
        this.gamePrompt = null;
        this.luckFactor = baseLuckFactor;
    }
    init(scene, posX, posY, balance) {
        super.init(scene, posX, posY, balance);
        return this;
    }

    increaseLuckFactor() {
        this.luckFactor++;
    }

    decreaseLuckFactor() {
        this.luckFactor--;
    }

    updateByInterest() {
        const currentTime = new Date().getTime();

        this.currentTermPeriodInstanceInMilliseconds = currentTime - this.lastTime;
        if (this.currentTermPeriodInstanceInMilliseconds >= this.intervalInMilliseconds / 4 && !this.locked && this.lockWhileInteresting) {
            this.setLocked(true);
        }

        if (this.currentTermPeriodInstanceInMilliseconds >= this.intervalInMilliseconds) {
            this.lastTime = currentTime;
            const fluctuation = this.calculateLuckFluctuation(this.luckFactor);
            const changeRate = this.interest * fluctuation;
            const changeAmount = this.balance * changeRate;
            this.updateBalance(this.balance + changeAmount);
            if(this.lockWhileInteresting) {
                this.setLocked(false);
            }
        }
        return this;
    }

    calculateLuckFluctuation(luckFactor) {
        const clampedLuck = Math.max(0, Math.min(luckFactor, 10));

        const random = (Math.random() * 2 - 1);

        const luckBias = clampedLuck / 20;

        return random + luckBias;
    }
}
