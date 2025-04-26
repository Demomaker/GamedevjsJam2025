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
            Music.setMusic(music);
            Music.play();
        }

        const musicMuteUnmuteButton = new ButtonComponent()
        .init(this, 400, 100, 400, 100, 'MUTE / UNMUTE', toPhaserColor(ForegroundColor), AddTitleText)
        .addCallback(() => {
            if(Music.isItPlaying()) {
                Music.pause();
            } else {
                Music.play();
            }
        })

        const playButton = new ButtonComponent()
        .init(this, 400, 300, 400, 300, 'PLAY', toPhaserColor(ForegroundColor), AddTitleText)
        .addCallback(() => {
            this.scene.start('GameScene');
        });

        const creditsButton = new ButtonComponent()
        .init(this, 400, 500, 400, 100, 'CREDITS', toPhaserColor(ForegroundColor), AddTitleText)
        .addCallback(() => {
            this.scene.start('AttributionScene');
        });
    }
    update() { /*menu logic*/ }
}
