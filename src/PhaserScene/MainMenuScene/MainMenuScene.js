import { ForegroundColor, toPhaserColor } from '../../GameProperties/Colors.js';
import { AddTitleText } from '../../GameProperties/Utils.js';
import { ButtonComponent } from '../../CustomElement/ButtonComponent/ButtonComponent.js';

export class MainMenuScene extends Phaser.Scene {
    constructor() { super('MainMenuScene'); }
    preload() { /*menu assets*/ }
    create() {
        const playButton = new ButtonComponent()
        .init(this, 400, 300, 400, 300, 'PLAY', toPhaserColor(ForegroundColor), AddTitleText)
        .addCallback(() => {
            this.scene.start('GameScene');
        });
    }
    update() { /*menu logic*/ }
}
