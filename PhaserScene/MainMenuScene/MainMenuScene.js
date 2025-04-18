export class MainMenuScene extends Phaser.Scene {
    constructor() { super('MainMenuScene'); }
    preload() { /*menu assets*/ }
    create() {
        // Create a play button
        const playButton = this.add.text(400, 300, 'PLAY', {
            fontSize: '32px',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111' })
        .setInteractive({ useHandCursor: true });

        // Add click event to the button
        playButton.on('pointerdown', () => {
            // Start the game scene
            this.scene.start('GameScene');
        });
    }
    update() { /*menu logic*/ }
}
