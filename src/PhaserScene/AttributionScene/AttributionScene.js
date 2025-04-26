import { ButtonComponent } from '../../CustomElement/ButtonComponent/ButtonComponent.js';
import { ForegroundColor, toPhaserColor } from '../../GameProperties/Colors.js';
import { AddTitleText } from '../../GameProperties/Utils.js';
import { KeyEventSubscription } from '../../CustomElement/KeyEvent/KeyEventSubscription.js';

export class AttributionScene extends Phaser.Scene {
    constructor() {
        super('AttributionScene');
    }
    preload() {
        this.load.text('creditsa', 'assets/credits.txt');
    }
    create() {
        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC && !KeyEventSubscription.isKeyboardReserved()) {
                this.scene.start('MainMenuScene');
            }
        });

        const mainMenuButton = new ButtonComponent()
        .init(this, 150, 75, 250, 100, 'Back to game', toPhaserColor(ForegroundColor), AddTitleText)
        .addCallback(() => {
            this.scene.start('MainMenuScene');
        });

        const creditsText = this.cache.text.get('creditsa');

        this.add.text(50, 150, creditsText, {
            font: '16px Arial',
            fill: toPhaserColor(ForegroundColor),
            wordWrap: { width: 700 }
        });
    }
    update() { /*menu logic*/ }
}
