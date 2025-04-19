import { AddNormalText } from '../../GameProperties/Utils.js';
import { RectangleContainer } from '../RectangleContainer/RectangleContainer.js';
import { GamePrompt } from '../Prompt/GamePrompt.js';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent.js';

export class AccountComponent {
    constructor(label, interest, intervalInMilliseconds, lockWhileInteresting) {
        this.label = label;
        this.interest = interest;
        this.intervalInMilliseconds = intervalInMilliseconds;
        this.lockWhileInteresting = lockWhileInteresting;
        this.labelText = null;
        this.interestText = null;
        this.accountValueText = null;
        this.termPeriodText = null;
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
        this.locked = false;
    }

    init(scene, posX, posY, initialAccountValue, gamePrompt = null) {
        this.scene = scene;
        this.posX = posX;
        this.posY = posY;
        this.gamePrompt = gamePrompt || new GamePrompt(scene).init();

        this.createSubComponents(scene, posX, posY, initialAccountValue);
        return this;
    }

    createSubComponents(scene, posX, posY, initialAccountValue) {
        this.createTextObjects(scene, posX, posY, initialAccountValue);

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
            this.interestText.width,
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

        this.createComponentGroup(scene);

        this.containerHeightWithButtons = (buttonY + buttonHeight + 20) * 1.5;

        Phaser.Actions.SetXY(this.componentGroup.getChildren(), this.posX - containerWidth/2, this.posY - containerHeight/2);

        this.labelText.x = this.posX;
        this.interestText.x = this.posX;
        if(this.lockWhileInteresting) {
            this.termPeriodText.x = this.posX;
        }
        this.accountValueText.x = this.posX;
        this.depositButton.setX(this.posX - buttonWidth/2 - buttonSpacing/2);
        this.withdrawButton.setX(this.posX + buttonWidth/2 + buttonSpacing/2);

        return this;
    }

    createTextObjects(scene, posX, posY, initialAccountValue) {
        this.labelText = AddNormalText(scene, 0, 0, this.label)
            .setPadding(10)
            .setOrigin(0.5, 0.5);

        this.interestText = AddNormalText(scene, 0, this.labelText.height + 10, `Interest : ${(this.interest * 100).toFixed(2)}% per ${(this.intervalInMilliseconds / 1000).toFixed(0)} seconds`)
            .setPadding(10)
            .setOrigin(0.5, 0)

        let accountValueTextYPos = this.interestText.height + 10;
        let accountValueTextOrigin = [0.5, -0.5];

        if(this.lockWhileInteresting) {
            this.termPeriodText = AddNormalText(scene, 0, this.interestText.height + 10, `0 / ${(this.intervalInMilliseconds / 1000).toFixed(0)} of the term period`)
            .setPadding(10)
            .setOrigin(0.5, -0.5);
            accountValueTextYPos = this.termPeriodText.height + 10;
            accountValueTextOrigin = [0.5, -1.0]
        }

        this.accountValueText = AddNormalText(scene, 0, accountValueTextYPos, initialAccountValue.toString())
            .setPadding(10)
            .setOrigin(accountValueTextOrigin[0], accountValueTextOrigin[1]);
    }

    createComponentGroup(scene) {
        this.componentGroup = scene.add.group();
        this.componentGroup.add(this.labelText);
        this.componentGroup.add(this.interestText);
        if(this.lockWhileInteresting) {
            this.componentGroup.add(this.termPeriodText);
        }
        this.componentGroup.add(this.accountValueText);
    }

    createButton(x, y, width, height, text, color) {
        return new ButtonComponent().init(this.scene, this.posX + x, this.posY + y, width, height, text, color).hide();
    }

    async promptForAmount(action) {
        const amount = await this.gamePrompt.show(action, `Enter amount to ${action.toLowerCase()}:`, "");
        return amount ? parseFloat(amount) : 0;
    }

    addDeposit(callback) {
        this.onDepositCallback = callback;
        this.depositButton.show().addCallback(this.onDepositCallback);
        this.container.setHeight(this.containerHeightWithButtons).setOrigin(0.5, 0.4);
        this.componentGroup.add(this.depositButton.getGroup());

        return this;
    }

    addWithdraw(callback) {
        this.onWithdrawCallback = callback;
        this.withdrawButton.show().addCallback(this.onWithdrawCallback);
        this.container.setHeight(this.containerHeightWithButtons).setOrigin(0.5, 0.4);
        this.componentGroup.add(this.withdrawButton.getGroup());

        return this;
    }

    async deposit() {
        return await this.promptForAmount("Deposit");
    }

    async withdraw() {
        return await this.promptForAmount("Withdraw");
    }

    update(accountValue) {
        this.accountValueText.text = accountValue.toFixed(2).toString();
        return this;
    }

    updateTermPeriodText(termPeriodInstanceInMilliseconds) {
        if(!this.lockWhileInteresting) {
            return this;
        }
        this.termPeriodText.text = `${(termPeriodInstanceInMilliseconds / 1000).toFixed(0)} / ${(this.intervalInMilliseconds / 1000).toFixed(0)} of the term period`
        return this;
    }

    lock() {
        this.depositButton.lock();
        this.withdrawButton.lock();
        this.locked = true;
    }

    unlock() {
        this.depositButton.unlock();
        this.withdrawButton.unlock();
        this.locked = false;
    }
};
