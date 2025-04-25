import { Account } from './Account.js';
import { GamePrompt } from '../../CustomElement/Prompt/GamePrompt.js';

export class OperationableAccount extends Account {
    constructor(accountName, interest, intervalInMilliseconds, lockWhileInteresting = false, isStableAccount = true) {
        super(accountName, interest, intervalInMilliseconds, lockWhileInteresting, isStableAccount);
        this.depositCallbacks = [];
        this.withdrawCallbacks = [];
        this.depositConditions = [];
        this.withdrawConditions = [];
        this.gamePrompt = null;
    }

    init(scene, posX, posY, balance) {
        super.init(scene, posX, posY, balance);
        return this.setupOrResetAccount(scene);
    }

    setupAccountComponent() {
        const parent = this;
        const self = this;
        parent.accountComponent = parent.accountComponent
        .addDeposit(async () => {
            const amount = await parent.accountComponent.deposit();
            if(parent.isLocked()) {
                this.gamePrompt.hide();
                this.gamePrompt.showAlert(`${self.getName()} Deposit`, 'You cannot deposit \nduring the term period.\nWait until the end of \nthis period before doing so.');
                return;
            }
            for (const { condition, failMessage } of self.depositConditions) {
                if(!condition(amount)) {
                    this.gamePrompt.showAlert(`${self.getName()} Deposit`, failMessage);
                    return;
                }
            }
            self.deposit(amount);
            for (const callback of self.depositCallbacks) {
                callback(amount);
            }

        })
        .addWithdraw(async () => {
            const amount = await parent.accountComponent.withdraw();
            if(parent.isLocked()) {
                this.gamePrompt.hide();
                this.gamePrompt.showAlert(`${self.getName()} Withdraw`, 'You cannot withdraw \nduring the term period.\nWait until the end of \nthis period before doing so.')
                return;
            }
            for (const {condition, failMessage} of self.withdrawConditions) {
                if(!condition(amount)) {
                    this.gamePrompt.showAlert(`${self.getName()} Withdraw`, failMessage);
                    return;
                }
            }
            if(self.withdraw(amount) <= -1) {
                return;
            }
            for (const callback of self.withdrawCallbacks) {
                callback(amount);
            }
        });
    }

    setupOrResetAccount(scene) {
        this.gamePrompt = new GamePrompt(scene).init();
        this.depositCallbacks = [];
        this.withdrawCallbacks = [];
        this.depositConditions = [];
        this.withdrawConditions = [];
        this.setupAccountComponent();
        return this;
    }

    setScene(scene) {
        super.setScene(scene);
        return this.setupOrResetAccount(scene);
    }


    deposit(amount) {
        this.balance += amount;
        return amount;
    }

    withdraw(amount) {
        if (amount > this.balance) {
            this.gamePrompt.showAlert(`${this.getName()} Withdraw`, "Insufficient funds!");
            return -1;
        }
        this.balance -= amount;
        return amount;
    }

    addWithdrawCondition(condition, failMessage) {
        this.withdrawConditions.push({ condition, failMessage });
        return this;
    };

    addDepositCondition(condition, failMessage) {
        this.depositConditions.push({ condition, failMessage });
        return this;
    }

    addDepositCallback(callback) {
        this.depositCallbacks.push(callback);
        return this;
    }

    addWithdrawCallback(callback) {
        this.withdrawCallbacks.push(callback);
        return this;
    }

    dependsOn(otherAccount) {
        return this.addDepositCallback((amount) => {
            otherAccount.decrementBalanceBy(amount);
        })
        .addWithdrawCallback((amount) => {
            otherAccount.incrementBalanceBy(amount);
        })
        .addDepositCondition((amount) => {
            return otherAccount.canWithdraw(amount);
        }, `${otherAccount.getName()} funds are insufficient!`);

    }
}
