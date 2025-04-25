import { TextColor } from '../../GameProperties/Colors.js';
import { AddTitleText, AddNormalText } from '../../GameProperties/Utils.js';
import { Account } from '../../GameObject/Account/Account.js';
import { OperationableAccount } from '../../GameObject/Account/OperationableAccount.js';
import { ButtonComponent } from '../../CustomElement/ButtonComponent/ButtonComponent.js';
import { KeyEventSubscription } from '../../CustomElement/KeyEvent/KeyEventSubscription.js';
import { MainAccount } from '../../InterSceneObjects/MainAccount.js';

const TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS = 100;

export class GameScene extends Phaser.Scene {
    static highYieldSavingsAccount = null;
    static guaranteedInvestmentsAccount = null;

    constructor() {
        super('GameScene');
        this.workButton = null;
        this.stockMarketButton = null;
        this.timeAtLastComponentUpdate = new Date().getTime();
    }
    preload() { /* game assets */ }
    create() {
        const self = this;

        if(MainAccount.isCheckingAccountNull()) {
            MainAccount.setCheckingAccount(new Account('Checking Account', 0.005, 10000)
            .init(this, 175, 100, 10));
        }
        else {
            MainAccount.getCheckingAccount().setScene(this);
        }
        if(!GameScene.highYieldSavingsAccount) {
            GameScene.highYieldSavingsAccount = new OperationableAccount('High Yield Savings Account', 0.05, 10000, false, true)
            .init(this, 175, 225, 0)
            .dependsOn(MainAccount.getCheckingAccount());
        }
        else {
            GameScene.highYieldSavingsAccount = GameScene.highYieldSavingsAccount
            .setScene(this)
            .dependsOn(MainAccount.getCheckingAccount());
        }
        if(!GameScene.guaranteedInvestmentsAccount) {
            GameScene.guaranteedInvestmentsAccount = new OperationableAccount('Guaranteed Investments Account', 0.50, 20000, true, true)
            .init(this, 515, 225, 0)
            .dependsOn(MainAccount.getCheckingAccount());
        }
        else {
            GameScene.guaranteedInvestmentsAccount = GameScene.guaranteedInvestmentsAccount
            .setScene(this)
            .dependsOn(MainAccount.getCheckingAccount());
        }

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
            MainAccount.getCheckingAccount().incrementBalanceBy(1);
        });

        this.stockMarketButton = new ButtonComponent()
        .init(
            this,
            176,
            425,
            buttonWidth,
            buttonHeight,
            'Stocks'
        )
        .addCallback(() => {
            this.scene.start('StockMarketScene');
        })

        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC && !KeyEventSubscription.isKeyboardReserved()) {
                this.scene.start('MainMenuScene');
            }
        });

        AddTitleText(this, 400, 400, 'Bank');
    }

    update() { /* game loop */
        const currentTime = new Date().getTime();
        if (currentTime - this.timeAtLastComponentUpdate >= TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS) {
            this.timeAtLastComponentUpdate = currentTime;
            this.render();
        }

        MainAccount.getCheckingAccount().updateByInterest();
        GameScene.highYieldSavingsAccount.updateByInterest();
        GameScene.guaranteedInvestmentsAccount.updateByInterest();
    }

    render() {
        MainAccount.getCheckingAccount().updateComponent();
        GameScene.highYieldSavingsAccount.updateComponent();
        GameScene.guaranteedInvestmentsAccount.updateComponent();
    }
}
