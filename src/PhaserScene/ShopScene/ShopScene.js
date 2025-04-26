import { MainAccount } from '../../InterSceneObjects/MainAccount.js';
import { AddTitleText } from '../../GameProperties/Utils.js';
import { ShopItemComponent } from '../../CustomElement/ShopItemComponent/ShopItemComponent.js';
import { ButtonComponent } from '../../CustomElement/ButtonComponent/ButtonComponent.js';
import { KeyEventSubscription } from '../../CustomElement/KeyEvent/KeyEventSubscription.js';

const TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS = 100;

export class ShopScene extends Phaser.Scene {
    static gameConsoleShopItem = null;
    static carShopItem = null;
    static houseShopItem = null;
    static guitarShopItem = null;

    constructor() {
        super('ShopScene');
        this.timeAtLastComponentUpdate = new Date().getTime();
    }
    preload() {
        this.load.image('background-faded', './assets/money-monk-with-jerry-logo-faded-3.png');
    }
    create() {
        this.add.image(400, 300, 'background-faded');
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

        if(ShopScene.gameConsoleShopItem == null) {
            ShopScene.gameConsoleShopItem = new ShopItemComponent('GameX3000 Gaming Console')
            .init(this, 200, 300, 200)
            .setCallback(() => {
                MainAccount.getGameProgress().buyConsole();
            });
        } else {
            ShopScene.gameConsoleShopItem = ShopScene.gameConsoleShopItem
            .setScene(this)
            .setCallback(() => {
                MainAccount.getGameProgress().buyConsole();
            });
        }

        if(ShopScene.carShopItem == null) {
            ShopScene.carShopItem = new ShopItemComponent('VroomVroomHerky Racecar')
            .init(this, 500, 300, 200000)
            .setCallback(() => {
                MainAccount.getGameProgress().buyCar();
            });
        } else {
            ShopScene.carShopItem = ShopScene.carShopItem
            .setScene(this)
            .setCallback(() => {
                MainAccount.getGameProgress().buyCar();
            });
        }

        if(ShopScene.houseShopItem == null) {
            ShopScene.houseShopItem = new ShopItemComponent('SuburbanHouses House')
            .init(this, 200, 500, 500000)
            .setCallback(() => {
                MainAccount.getGameProgress().buyHouse();
            });
        } else {
            ShopScene.houseShopItem = ShopScene.houseShopItem
            .setScene(this)
            .setCallback(() => {
                MainAccount.getGameProgress().buyHouse();
            });
        }

        if(ShopScene.guitarShopItem == null) {
            ShopScene.guitarShopItem = new ShopItemComponent('ShredderOfNewzz Guitar')
            .init(this, 500, 500, 5000000)
            .setCallback(() => {
                MainAccount.getGameProgress().buyGuitar();
            });
        } else {
            ShopScene.guitarShopItem = ShopScene.guitarShopItem
            .setScene(this)
            .setCallback(() => {
                MainAccount.getGameProgress().buyGuitar();
            });
        }

        AddTitleText(this, 675, 535, 'Shop');
    }
    update() { /* game loop */
        const currentTime = new Date().getTime();
        if (currentTime - this.timeAtLastComponentUpdate >= TIME_BETWEEN_COMPONENT_UPDATES_IN_MILLISECONDS) {
            this.timeAtLastComponentUpdate = currentTime;
            this.render();
        }

        MainAccount.getCheckingAccount().updateByInterest();
    }

    render() {
        MainAccount.getCheckingAccount().updateComponent();
    }
}
