import { PageBackgroundColor, PhaserBackgroundColor } from './GameProperties/Colors.js';
import { MainMenuScene } from './PhaserScene/MainMenuScene/MainMenuScene.js';
import { GameScene } from './PhaserScene/GameScene/GameScene.js';
import { StockMarketScene } from './PhaserScene/StockMarketScene/StockMarketScene.js';
import { ShopScene } from './PhaserScene/ShopScene/ShopScene.js';
import { AttributionScene } from './PhaserScene/AttributionScene/AttributionScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: PhaserBackgroundColor,
    scene: [MainMenuScene, GameScene, StockMarketScene, ShopScene, AttributionScene]
}

document.body.style = `
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: ${PageBackgroundColor};
`;

const game = new Phaser.Game(config);
