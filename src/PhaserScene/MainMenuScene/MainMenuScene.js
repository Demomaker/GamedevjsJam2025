import { ForegroundColor, toPhaserColor } from '../../GameProperties/Colors.js';
import { AddTitleText } from '../../GameProperties/Utils.js';
import { ButtonComponent } from '../../CustomElement/ButtonComponent/ButtonComponent.js';
import { Music } from '../../InterSceneObjects/Music.js';

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }
    preload() {
        this.load.image('background', './assets/money-monk-with-jerry-logo.png');
        this.load.audio('musicaudio', './assets/tuesday-vibes-by-snoozybeats.mp3');
    }
    create() {
        this.add.image(400, 300, 'background');

        if(Music.isNull()) {
            const music = this.sound.add('musicaudio');
            music.setLoop(true);
            music.play();
            Music.setMusic(music);
        }

        const playButton = new ButtonComponent()
        .init(this, 400, 300, 400, 300, 'PLAY', toPhaserColor(ForegroundColor), AddTitleText)
        .addCallback(() => {
            this.scene.start('GameScene');
        });

        const creditsButton = new ButtonComponent()
        .init(this, 400, 450, 400, 100, 'CREDITS', toPhaserColor(ForegroundColor), AddTitleText)
        .addCallback(() => {
            this.scene.start('AttributionScene');
        });
    }
    update() { /*menu logic*/ }
}
