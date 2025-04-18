import { AddNormalText } from '../../GameProperties/Utils.js';

export class ButtonComponent {
    constructor() {
        this.callbacks = [];
        this.buttonGroup = null;
    }

    init(scene, x, y, width, height, text) {
        this.buttonGroup = this.createButton(
            scene,
            x,
            y,
            width,
            height,
            text,
            0x4CAF50 //Green
        );
         this.buttonGroup.getChildren()[0].on('pointerdown', () => {
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
}
