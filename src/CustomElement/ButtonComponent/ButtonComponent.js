import { AddNormalText } from '../../GameProperties/Utils.js';

export class ButtonComponent {
    constructor() {
        this.callbacks = [];
        this.buttonGroup = null;
    }

    init(scene, x, y, width, height, text, color = 0x4CAF50 /*Green*/) {
        this.buttonGroup = this.createButton(
            scene,
            x,
            y,
            width,
            height,
            text,
            color
        );

        this.getButton().on('pointerdown', () => {
            for(const callback of this.callbacks) {
                callback();
            }
        });

        return this;
    }

    addCallback(callback) {
        this.callbacks.push(callback);
        return this;
    }

    show() {
        this.buttonGroup.setVisible(true);
        this.enable();
        return this;
    }

    hide() {
        this.buttonGroup.setVisible(false);
        this.disable();
        return this;
    }

    disable() {
        this.getButton().disableInteractive();
        return this;
    }

    enable() {
        this.getButton().setInteractive({ useHandCursor: true });
        return this;
    }

    lock() {
        this.disable();
        this.getButton().setAlpha(0.3);
        this.getButton().input.enabled = false;
    }

    unlock() {
        this.enable();
        this.getButton().setAlpha(1);
        this.getButton().input.enabled = true;
    }

    createButton(scene, x, y, width, height, text, color) {
        const button = scene.add.rectangle(
            x,
            y,
            width,
            height,
            color
        ).setInteractive({ useHandCursor: true });

        const buttonText = AddNormalText(
            scene,
            x,
            y,
            text
        ).setOrigin(0.5);

        button.on('pointerover', () => {
            button.setAlpha(0.8);
        });

        button.on('pointerout', () => {
            button.setAlpha(1);
        });

        const buttonGroup = scene.add.group();
        buttonGroup.add(button);
        buttonGroup.add(buttonText);

        buttonGroup.text = buttonText;
        buttonGroup.setVisible(true);

        return buttonGroup;
    }

    setX(posX) {
        this.buttonGroup.setX(posX);
        return this;
    }

    setY(posY) {
        this.buttonGroup.setY(posY);
        return this;
    }

    setDepth(depth) {
        this.getButton().setDepth(depth);
        this.getButtonText().setDepth(depth + 1);
        return this;
    }

    getGroup() {
        return this.buttonGroup;
    }

    getButton() {
        return this.buttonGroup.getChildren()[0];
    }

    getButtonText() {
        return this.buttonGroup.getChildren()[1];
    }
}
