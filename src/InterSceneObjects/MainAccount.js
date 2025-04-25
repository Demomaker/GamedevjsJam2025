export class MainAccount {
    static checkingAccount = null;
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
}
