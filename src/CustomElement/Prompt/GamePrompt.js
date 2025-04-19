import { AddNormalText } from '../../GameProperties/Utils.js';
import { ForegroundColor, toPhaserColor } from '../../GameProperties/Colors.js';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent.js';

export class GamePrompt {
    constructor(scene) {
        this.scene = scene;
        this.container = null;
        this.background = null;
        this.overlay = null;
        this.titleText = null;
        this.messageText = null;
        this.inputField = null;
        this.confirmButton = null;
        this.cancelButton = null;
        this.inputValue = '';
        this.inputBg = null;
        this.isActive = false;
        this.confirmCallback = null;
        this.cancelCallback = null;

        this.originalKeyboardInput = null;
    }

    init() {
        const { width, height } = this.scene.scale;

        this.overlay = this.scene.add.rectangle(
            width / 2,
            height / 2,
            width,
            height,
            0x000000,
            0.6
        ).setInteractive();
        this.overlay.setDepth(1000);
        this.overlay.setVisible(false);

        const promptWidth = Math.min(400, width * 0.8);
        const promptHeight = 220;

        this.background = this.scene.add.rectangle(
            width / 2,
            height / 2,
            promptWidth,
            promptHeight,
            0xdddddd,
            1
        );
        this.background.setStrokeStyle(2, 0xffffff);
        this.background.setDepth(1001);
        this.background.setVisible(false);

        this.titleText = AddNormalText(
            this.scene,
            width / 2,
            height / 2 - promptHeight / 2 + 30,
            "Prompt"
        );
        this.titleText.setOrigin(0.5);
        this.titleText.setDepth(1002);
        this.titleText.setVisible(false);

        this.messageText = AddNormalText(
            this.scene,
            width / 2,
            height / 2 - 20,
            "Enter a value:"
        );
        this.messageText.setOrigin(0.5);
        this.messageText.setDepth(1002);
        this.messageText.setVisible(false);

        this.inputBg = this.scene.add.rectangle(
            width / 2,
            height / 2 + 20,
            promptWidth - 60,
            40,
            0xEEEEEE
        );
        this.inputBg.setDepth(1002);
        this.inputBg.setVisible(false);

        this.inputField = AddNormalText(
            this.scene,
            width / 2,
            height / 2 + 20,
            ""
        );
        this.inputField.setOrigin(0.5);
        this.inputField.setDepth(1003);
        this.inputField.setVisible(false);

        this.confirmButton = this.createButton(
            width / 2 - 80,
            height / 2 + promptHeight / 2 - 30,
            140,
            40,
            "Confirm",
            0x4CAF50,
            1002
        ).hide();


        this.cancelButton = this.createButton(
            width / 2 + 80,
            height / 2 + promptHeight / 2 - 30,
            140,
            40,
            "Cancel",
            0xF44336,
            1002
        ).hide();

        this.container = this.scene.add.container(0, 0, [
            this.overlay,
            this.background,
            this.titleText,
            this.messageText,
            this.inputBg,
            this.inputField,
            this.confirmButton.getButton(),
            this.confirmButton.getButtonText(),
            this.cancelButton.getButton(),
            this.cancelButton.getButtonText()
        ]);

        this.container.setDepth(1000);
        this.container.setVisible(false);

        return this;
    }

    createButton(x, y, width, height, text, color, depth) {
        const buttonComponent = new ButtonComponent().init(this.scene, x, y, width, height, text, color).setDepth(depth);

        return buttonComponent;
    }

    setupKeyboardInput() {
        this.originalKeyboardInput = this.scene.input.keyboard.enabled;

        this.scene.input.keyboard.enabled = true;

        const keyboard = this.scene.input.keyboard.addKeys({
            'BACKSPACE': Phaser.Input.Keyboard.KeyCodes.BACKSPACE,
            'ENTER': Phaser.Input.Keyboard.KeyCodes.ENTER,
            'ESC': Phaser.Input.Keyboard.KeyCodes.ESC,
            'SPACE': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'ZERO': Phaser.Input.Keyboard.KeyCodes.ZERO,
            'ONE': Phaser.Input.Keyboard.KeyCodes.ONE,
            'TWO': Phaser.Input.Keyboard.KeyCodes.TWO,
            'THREE': Phaser.Input.Keyboard.KeyCodes.THREE,
            'FOUR': Phaser.Input.Keyboard.KeyCodes.FOUR,
            'FIVE': Phaser.Input.Keyboard.KeyCodes.FIVE,
            'SIX': Phaser.Input.Keyboard.KeyCodes.SIX,
            'SEVEN': Phaser.Input.Keyboard.KeyCodes.SEVEN,
            'EIGHT': Phaser.Input.Keyboard.KeyCodes.EIGHT,
            'NINE': Phaser.Input.Keyboard.KeyCodes.NINE,
            'PERIOD': Phaser.Input.Keyboard.KeyCodes.PERIOD
        });

        const numberKeys = [
            'ZERO', 'ONE', 'TWO', 'THREE', 'FOUR',
            'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'
        ];

        this.scene.input.keyboard.on('keydown', (event) => {
            if (!this.isActive) return;

            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE) {
                this.inputValue = this.inputValue.slice(0, -1);
                this.inputField.setText(this.inputValue);
                return;
            }

            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
                this.confirm();
                return;
            }

            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
                this.cancel();
                return;
            }

            if ((event.keyCode >= Phaser.Input.Keyboard.KeyCodes.ZERO && event.keyCode <= Phaser.Input.Keyboard.KeyCodes.NINE) || event.keyCode === Phaser.Input.Keyboard.KeyCodes.PERIOD) {
                let char = String.fromCharCode(event.keyCode);
                if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.PERIOD) {
                    char = '.';
                }

                if (char === '.' && this.inputValue.includes('.')) {
                    return;
                }
                this.inputValue += char;
                this.inputField.setText(this.inputValue);
            }
        });
    }

    restoreKeyboardInput() {
        this.scene.input.keyboard.removeAllListeners('keydown');

        if (this.originalKeyboardInput !== null) {
            this.scene.input.keyboard.enabled = this.originalKeyboardInput;
        }
    }

    show(title, message, defaultValue = '', confirmCallback = null, cancelCallback = null) {
        if (this.isActive) return;

        this.isActive = true;
        this.inputValue = defaultValue.toString();
        this.confirmCallback = confirmCallback;
        this.cancelCallback = cancelCallback;

        this.titleText.setText(title);
        this.messageText.setText(message);
        this.inputField.setText(this.inputValue);

        this.inputBg.setVisible(true);
        this.container.setVisible(true);
        this.overlay.setVisible(true);
        this.background.setVisible(true);
        this.titleText.setVisible(true);
        this.messageText.setVisible(true);
        this.inputField.setVisible(true);

        this.confirmButton.show();
        this.cancelButton.show();

        this.confirmButton.getButton().on('pointerdown', this.confirm.bind(this));
        this.cancelButton.getButton().on('pointerdown', this.cancel.bind(this));

        this.setupKeyboardInput();

        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    confirm() {
        if (!this.isActive) return;

        const value = parseFloat(this.inputValue) || 0;

        if (this.confirmCallback) {
            this.confirmCallback(value);
        }

        this.hide();

        if (this._resolve) {
            this._resolve(value);
            this._resolve = null;
            this._reject = null;
        }
    }

    cancel() {
        if (!this.isActive) return;

        if (this.cancelCallback) {
            this.cancelCallback();
        }

        this.hide();

        if (this._reject) {
            this._reject('User cancelled');
            this._resolve = null;
            this._reject = null;
        }
    }

    hide() {
        this.isActive = false;

        this.container.setVisible(false);
        this.overlay.setVisible(false);
        this.background.setVisible(false);
        this.titleText.setVisible(false);
        this.messageText.setVisible(false);
        this.inputField.setVisible(false);
        this.inputBg.setVisible(false);

        this.confirmButton.hide();
        if (this.confirmButton.getButton().listeners) {
            this.confirmButton.getButton().removeAllListeners('pointerdown');
        }

        this.cancelButton.hide();
        if (this.cancelButton.getButton().listeners) {
            this.cancelButton.getButton().removeAllListeners('pointerdown');
        }

        this.restoreKeyboardInput();

        this.inputValue = '';
        this.confirmCallback = null;
        this.cancelCallback = null;
    }

    showAlert(title, message, callback = null) {
        if (this.isActive) return;

        this.isActive = true;

        this.titleText.setText(title);
        this.messageText.setText(message);

        this.container.setVisible(true);
        this.overlay.setVisible(true);
        this.background.setVisible(true);
        this.titleText.setVisible(true);
        this.messageText.setVisible(true);

        this.inputField.setVisible(false);

        this.confirmButton.show();
        this.confirmButton.getButtonText().setText("OK");
        this.confirmButton.setX(this.scene.scale.width / 2);

        this.cancelButton.hide();

        this.confirmCallback = callback;
        this.confirmButton.getButton().on('pointerdown', this.confirm.bind(this));

        this.setupKeyboardInput();

        return new Promise((resolve) => {
            this._resolve = resolve;
        });
    }
}
