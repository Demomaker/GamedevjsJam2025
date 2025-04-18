import { MainMenuScene } from './PhaserScene/MainMenuScene/MainMenuScene.js';
import { GameScene } from './PhaserScene/GameScene/GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [MainMenuScene, GameScene]
}

const game = new Phaser.Game(config);
