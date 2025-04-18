import { AddNormalText } from '../../GameProperties/Utils.js';
import { RectangleContainer } from '../RectangleContainer/RectangleContainer.js';
import { GamePrompt } from '../Prompt/GamePrompt.js';

export class AccountComponent {
    constructor(label) {
        this.label = label;
        this.labelText = null;
        this.accountValueText = null;
        this.posX = 0;
        this.posY = 0;
        this.container = null;
        this.scene = null;
        this.depositButton = null;
        this.withdrawButton = null;
        this.onDepositCallback = null;
        this.onWithdrawCallback = null;
        this.componentGroup = null;
        this.containerHeightWithButtons = 0;
        this.gamePrompt = null;
    }

    init(scene, posX, posY, initialAccountValue, gamePrompt = null) {
        this.scene = scene;
        this.posX = posX;
        this.posY = posY;
        this.labelText = AddNormalText(scene, 0, 0, this.label)
            .setPadding(10)
            .setOrigin(0.5, 0.5);

        this.gamePrompt = gamePrompt || new GamePrompt(scene).init();

        this.accountValueText = AddNormalText(scene, 0, this.labelText.height + 10, initialAccountValue.toString())
        .setPadding(10)
        .setOrigin(0.5, 0);

        const buttonY = this.accountValueText.y + this.accountValueText.height + 15;
        const buttonSpacing = 10;
        const buttonWidth = 120;
        const buttonHeight = 40;

        this.depositButton = this.createButton(
            -buttonWidth/2 - buttonSpacing/2,
            buttonY,
            buttonWidth,
            buttonHeight,
            "Deposit",
            0x4CAF50 //Green
        )

        this.withdrawButton = this.createButton(
            buttonWidth/2 + buttonSpacing/2,
            buttonY,
            buttonWidth,
            buttonHeight,
            "Withdraw",
            0xF44336 //Red
        )

        const containerWidth = Math.max(
            this.labelText.width,
            this.accountValueText.width,
            buttonWidth * 2 + buttonSpacing
        ) + 40;

        const containerHeight = buttonY;
        this.container = new RectangleContainer()
        .init(
            scene,
            posX,
            posY,
            containerWidth,
            containerHeight
        );

        this.componentGroup = scene.add.group();
        this.componentGroup.add(this.labelText);
        this.componentGroup.add(this.accountValueText);
        this.containerHeightWithButtons = (buttonY + buttonHeight + 20) * 1.5;

        Phaser.Actions.SetXY(this.componentGroup.getChildren(), this.posX - containerWidth/2, this.posY - containerHeight/2);

        this.labelText.x = this.posX;
        this.accountValueText.x = this.posX;
        this.depositButton.x = this.posX - buttonWidth/2 - buttonSpacing/2;
        this.withdrawButton.x = this.posX + buttonWidth/2 + buttonSpacing/2;

        return this;
    }

    createButton(x, y, width, height, text, color) {
        const button = this.scene.add.rectangle(
            this.posX + x,
            this.posY + y,
            width,
            height,
            color
        ).setInteractive({ useHandCursor: true });

        const buttonText = AddNormalText(
            this.scene,
            this.posX + x,
            this.posY + y,
            text
        ).setOrigin(0.5);

        button.on('pointerover', () => {
            button.setAlpha(0.8);
        });

        button.on('pointerout', () => {
            button.setAlpha(1);
        });

        const buttonGroup = this.scene.add.group();
        buttonGroup.add(button);
        buttonGroup.add(buttonText);

        buttonGroup.text = buttonText;
        buttonGroup.setVisible(false);

        return buttonGroup;
    }

    async promptForAmount(action) {
        const amount = await this.gamePrompt.show(action, `Enter amount to ${action.toLowerCase()}:`, "0");
        return amount ? parseInt(amount) : 0;
    }

    addDeposit(callback) {
        this.onDepositCallback = callback;
        this.depositButton.setVisible(true);
        this.depositButton.getChildren()[0].on('pointerdown', () => {
            if (this.onDepositCallback) {
                this.onDepositCallback(this);
            }
        });
        this.container.setHeight(this.containerHeightWithButtons).setOrigin(0.5, 0.4);
        this.componentGroup.add(this.depositButton);

        return this;
    }

    addWithdraw(callback) {
        this.onWithdrawCallback = callback;
        this.withdrawButton.setVisible(true);
        this.withdrawButton.getChildren()[0].on('pointerdown', () => {
            if (this.onWithdrawCallback) {
                this.onWithdrawCallback(this);
            }
        });
        this.container.setHeight(this.containerHeightWithButtons).setOrigin(0.5, 0.4);
        this.componentGroup.add(this.withdrawButton);

        return this;
    }

    async deposit() {
        return await this.promptForAmount("Deposit");
    }

    async withdraw() {
        return await this.promptForAmount("Withdraw");
    }

    update(accountValue) {
        this.accountValue = accountValue;
        this.accountValueText.text = accountValue.toString();
        return this;
    }

    setPosition(x, y) {
        // Update stored positions
        const dx = x - this.posX;
        const dy = y - this.posY;
        this.posX = x;
        this.posY = y;

        // Update container position
        this.container.setPosition(x, y);

        // Update all elements' positions
        this.accountValueText.x += dx;
        this.accountValueText.y += dy;

        // Move button groups
        for (const button of [this.depositButton, this.withdrawButton]) {
            button.getChildren().forEach(child => {
                child.x += dx;
                child.y += dy;
            });
        }

        return this;
    }

    getLabel() {
        return this.label;
    }
};
