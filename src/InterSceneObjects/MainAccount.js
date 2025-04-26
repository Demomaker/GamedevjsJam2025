import { GameProgress } from './GameProgress.js';

export class MainAccount {
    static checkingAccount = null;
    static gameProgress = new GameProgress();
    static {
    }

    static setCheckingAccount(checkingAccount) {
        MainAccount.checkingAccount = checkingAccount;
    }

    static getCheckingAccount() {
        return MainAccount.checkingAccount;
    }

    static isCheckingAccountNull() {
        return !MainAccount.checkingAccount;
    }

    static getGameProgress() {
        return MainAccount.gameProgress;
    }

    static hasWon() {
        return MainAccount.getGameProgress().allItemsBought();
    }
}
