import { BorderColor, toPhaserColor } from '../../GameProperties/Colors.js';

export class RectangleContainer {
    constructor() { this.rectangleContainer = null; }

    init(scene, posX, posY, width, height) {
        const containerStrokeWidth = 2;

        this.rectangleContainer = scene.add.rectangle(posX + containerStrokeWidth / 2, posY + containerStrokeWidth / 2, width, height)
        .setStrokeStyle(containerStrokeWidth, toPhaserColor(BorderColor), 0.3)
        .setOrigin(0.5, 0.9);

        return this;
    }

    update(posX, posY, width, height) {
        this.rectangleContainer = this.rectangleContainer.setSize(width, height).setPosition(posX, posY);

        return this;
    }

    setHeight(height) {
        this.rectangleContainer = this.rectangleContainer.setSize(this.rectangleContainer.width, height);

        return this;
    }

    setOrigin(originX, originY) {
        this.rectangleContainer = this.rectangleContainer.setOrigin(originX, originY);
    }
}
