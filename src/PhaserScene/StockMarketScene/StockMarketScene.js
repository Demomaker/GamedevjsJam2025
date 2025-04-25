import { MainAccount } from '../../InterSceneObjects/MainAccount.js';
import { AddTitleText, AddNormalText } from '../../GameProperties/Utils.js';
import { KeyEventSubscription } from '../../CustomElement/KeyEvent/KeyEventSubscription.js';
import { StockAccount } from '../../GameObject/Account/StockAccount.js';
import { ButtonComponent } from '../../CustomElement/ButtonComponent/ButtonComponent.js';
import { Jerry } from '../../GameObject/Jerry/Jerry.js';

const TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS = 100;

export class StockMarketScene extends Phaser.Scene {
    static stableCompanyStockAccount = null;
    static growingStartupStockAccount = null;

    constructor() {
        super('StockMarketScene');
        this.timeAtLastComponentUpdate = new Date().getTime();
        this.goToTheBankButton = null;
        this.jerry = null;
    }
    preload() {
        this.load.image('jerry-body', 'assets/jerry-body-2.png');
        this.load.image('jerry-face', 'assets/jerry-face-2.png');
        this.load.image('jerry-hair', 'assets/jerry-hair-2.png');
        this.load.image('particle', 'assets/particle.png');
    }
    create() {
        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC && !KeyEventSubscription.isKeyboardReserved()) {
                this.scene.start('GameScene');
            }
        });

        if(MainAccount.isCheckingAccountNull()) {
            this.scene.start('GameScene');
        }
        else {
            MainAccount.getCheckingAccount().setScene(this);
        }

        if(!StockMarketScene.stableCompanyStockAccount) {
            StockMarketScene.stableCompanyStockAccount = new StockAccount('StableCo', 0.08, 1000)
            .init(this, 175, 225, 0)
            .dependsOn(MainAccount.getCheckingAccount());
        } else {
            StockMarketScene.stableCompanyStockAccount = StockMarketScene.stableCompanyStockAccount
            .setScene(this)
            .dependsOn(MainAccount.getCheckingAccount());
        }

        if(!StockMarketScene.growingStartupStockAccount) {
            StockMarketScene.growingStartupStockAccount = new StockAccount('CharmingCo', 0.34, 1000)
            .init(this, 515, 225, 0)
            .dependsOn(MainAccount.getCheckingAccount());
        } else {
            StockMarketScene.growingStartupStockAccount = StockMarketScene.growingStartupStockAccount
            .setScene(this)
            .dependsOn(MainAccount.getCheckingAccount());
        }

        this.jerry = new Jerry(this, 200, 500)
        .addGoodAnnouncementCallback(() => {
            StockMarketScene.growingStartupStockAccount.increaseLuckFactor();
            StockMarketScene.stableCompanyStockAccount.increaseLuckFactor();
        })
        .addBadAnnouncementCallback(() => {
            StockMarketScene.growingStartupStockAccount.decreaseLuckFactor();
            StockMarketScene.stableCompanyStockAccount.decreaseLuckFactor();
        });

        const buttonWidth = 332;
        const buttonHeight = 96;
        this.goToTheBankButton = new ButtonComponent()
        .init(
            this,
            516,
            64,
            buttonWidth,
            buttonHeight,
            'Bank'
        )
        .addCallback(() => {
            this.scene.start('GameScene');
        });

        AddTitleText(this, 400, 400, 'Stock Market');


    }
    update(time, delta) {
        this.jerry.update(time);
        const currentTime = new Date().getTime();
        if (currentTime - this.timeAtLastComponentUpdate >= TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS) {
            this.timeAtLastComponentUpdate = currentTime;
            this.render();
        }


        MainAccount.getCheckingAccount().updateByInterest();
        StockMarketScene.stableCompanyStockAccount.updateByInterest();
        StockMarketScene.growingStartupStockAccount.updateByInterest();
    }

    render() {
        MainAccount.getCheckingAccount().updateComponent();
        StockMarketScene.stableCompanyStockAccount.updateComponent();
        StockMarketScene.growingStartupStockAccount.updateComponent();
    }
}
