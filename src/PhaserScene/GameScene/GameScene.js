import { TextColor } from '../../GameProperties/Colors.js';
import { AddTitleText, AddNormalText } from '../../GameProperties/Utils.js';
import { Account } from '../../GameObject/Account/Account.js';
import { OperationableAccount } from '../../GameObject/Account/OperationableAccount.js';
import { ButtonComponent } from '../../CustomElement/ButtonComponent/ButtonComponent.js';
import { KeyEventSubscription } from '../../CustomElement/KeyEvent/KeyEventSubscription.js';

const TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS = 100;

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.checkingAccount = null;
        this.highYieldSavingsAccount = null;
        this.guaranteedInvestmentsAccount = null;
        this.workButton = null;
        this.timeAtLastComponentUpdate = new Date().getTime();
    }
    preload() { /* game assets */ }
    create() {
        const self = this;
        this.checkingAccount = new Account('Checking Account', 0.005, 10000)
        .init(this, 175, 100, 10);
        this.highYieldSavingsAccount = new OperationableAccount('High Yield Savings Account', 0.05, 10000)
        .init(this, 175, 225, 0)
        .dependsOn(this.checkingAccount);
        this.guaranteedInvestmentsAccount = new OperationableAccount('Guaranteed Investments Account', 0.50, 20000, true)
        .init(this, 515, 225, 0)
        .dependsOn(this.checkingAccount);

        const buttonWidth = 332;
        const buttonHeight = 96;
        this.workButton = new ButtonComponent()
        .init(
            this,
            516,
            64,
            buttonWidth,
            buttonHeight,
            'Work'
        )
        .addCallback(() => {
            this.checkingAccount.incrementBalanceBy(1);
        });

        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC && !KeyEventSubscription.isKeyboardReserved()) {
                this.scene.start('MainMenuScene');
            }
        });
    }

    update() { /* game loop */
        const currentTime = new Date().getTime();
        if (currentTime - this.timeAtLastComponentUpdate >= TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS) {
            this.timeAtLastComponentUpdate = currentTime;
            this.render();
        }

        this.checkingAccount.updateByInterest();
        this.highYieldSavingsAccount.updateByInterest();
        this.guaranteedInvestmentsAccount.updateByInterest();
    }

    render() {
        this.checkingAccount.updateComponent();
        this.highYieldSavingsAccount.updateComponent();
        this.guaranteedInvestmentsAccount.updateComponent();
    }
}
