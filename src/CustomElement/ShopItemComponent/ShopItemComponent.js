import { MainAccount } from '../../InterSceneObjects/MainAccount.js';
import { AddNormalText } from '../../GameProperties/Utils.js';
import { GamePrompt } from '../Prompt/GamePrompt.js';
import { ButtonComponent } from '../../CustomElement/ButtonComponent/ButtonComponent.js';
import { RectangleContainer } from '../RectangleContainer/RectangleContainer.js';

export class ShopItemComponent {
    constructor(label) {
        this.label = label;
        this.labelText = null;
        this.availabilityText = null;
        this.componentGroup = null;
        this.priceText = null;
        this.buyButton = null;
        this.container = null;
        this.scene = null;
        this.posX = 0;
        this.posY = 0;
        this.price = 0;
        this.locked = false;
        this.gamePrompt = null;
        this.callback = null;
        this.condition = null;
    }

    init(scene, posX, posY, price) {
        this.scene = scene;
        this.posX = posX;
        this.posY = posY;
        this.price = price;
        this.setupOrResetShop(scene);
        return this;
    }

    setupOrResetShop(scene) {
        this.labelText = null;
        this.availabilityText = null;
        this.priceText = null;
        this.buyButton = null;
        this.container = null;
        this.callback = null;
        this.condition = null;
        this.componentGroup = null;
        this.gamePrompt = new GamePrompt(scene).init();
        return this.createSubComponents(scene);
    }

    setScene(scene) {
        this.scene = scene;
        return this.setupOrResetShop(scene);
    }

    createSubComponents(scene) {
        this.labelText = AddNormalText(scene, 0, 0, this.label)
        .setPadding(10)
        .setOrigin(0.5, 0.5);

        this.availabilityText = AddNormalText(scene, 0, this.labelText.height + 10, "For Sale")
        .setPadding(10)
        .setOrigin(0.5, 0);

        this.priceText = AddNormalText(scene, 0, this.availabilityText.height + 10, this.price.toFixed(2).toString())
        .setPadding(10)
        .setOrigin(0.5, -0.5);

        const buttonWidth = 120;
        const buttonHeight = 40;

        this.buyButton = this.createButton(
            0,
            this.priceText.height - 40,
            buttonWidth,
            buttonHeight,
            "Buy",
            0x4CAF50,
            1002
        )
        .addCallback(() => {
            this.buy();
        })
        .show();

        const containerWidth = Math.max(
            this.labelText.width,
            this.priceText.width,
            this.availabilityText.width,
            buttonWidth * 2
        ) + 40;

        const containerHeight = 125 + buttonHeight + 20;
        this.container = new RectangleContainer()
        .init(
            this.scene,
            this.posX,
            this.posY,
            containerWidth,
            containerHeight
        );

        this.createComponentGroup(this.scene);

        Phaser.Actions.SetXY(this.componentGroup.getChildren(), this.posX - containerWidth/2, this.posY - containerHeight/2);

        this.labelText.x = this.posX;
        this.priceText.x = this.posX;
        this.availabilityText.x = this.posX;

        return this;
    }

    createComponentGroup(scene) {
        this.componentGroup = scene.add.group();
        this.componentGroup.add(this.labelText);
        this.componentGroup.add(this.priceText);
        this.componentGroup.add(this.availabilityText);
        return this;
    }

    createButton(x, y, width, height, text, color) {
        return new ButtonComponent().init(this.scene, this.posX + x, this.posY + y, width, height, text, color).hide();
    }

    isBuyable() {
        return !this.condition() && !MainAccount.isCheckingAccountNull() && MainAccount.getCheckingAccount().canWithdraw(this.price);
    }

    buy() {
        if(this.locked) {
            return this;
        }

        if(this.isBuyable()) {
            MainAccount.getCheckingAccount().decrementBalanceBy(this.price);
            this.callback();
            this.lock();
            if(MainAccount.hasWon()) {
                this.gamePrompt.showAlert(`This experiment is over`, "You've bought everything! Congrats! (You won?...)");
            }
        } else {
            this.gamePrompt.showAlert(`${this.label} Purchase`, "Insufficient funds!");
        }

        return this;
    }

    setCallback(callback) {
        this.callback = callback;
        return this;
    }

    setCondition(condition) {
        this.condition = condition;
        if(this.condition()) {
            this.lock();
        }
        return this;
    }

    lock() {
        this.locked = true;
        this.availabilityText.text = "Bought";
        this.priceText.text = "";
        this.buyButton.lock();
        this.buyButton.getButtonText().text = "Bought";
        return this;
    }
}
