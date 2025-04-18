export class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }
    preload() { /* game assets */ }
    create() {
        this.add.text(400, 300, 'GAME IS PLAYING!!!', {
            fontSize: '32px',
            fill: '#fff'
        })
    }
    update() { /* game loop */ }
}
