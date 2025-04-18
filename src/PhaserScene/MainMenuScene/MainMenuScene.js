import { TextColor } from '../../GameProperties/Colors.js';
import { AddTitleText } from '../../GameProperties/Utils.js';

export class MainMenuScene extends Phaser.Scene {
    constructor() { super('MainMenuScene'); }
    preload() { /*menu assets*/ }
    create() {
        // Create a play button
        const playButton = AddTitleText(this, 400, 300, 'PLAY')
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive({ useHandCursor: true });

        // Add click event to the button
        playButton.on('pointerdown', () => {
            // Start the game scene
            this.scene.start('GameScene');
        });
    }
    update() { /*menu logic*/ }
}
