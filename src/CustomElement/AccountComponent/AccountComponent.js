import { AddNormalText } from '../../GameProperties/Utils.js';
import { ForegroundColor } from '../../GameProperties/Colors.js';

export class AccountComponent {
    constructor(label) { this.label = label; this.accountValueText = null; }

    init(scene, posX, posY, initialAccountValue) {
        const labelText = AddNormalText(scene, posX, posY, this.label)
        .setPadding(10);
        this.accountValueText = AddNormalText(scene, posX, posY + 20, initialAccountValue.toString())
        .setPadding(10);
        console.log(ForegroundColor);

        const containerWidth = labelText.width;
        const containerHeight = labelText.height + this.accountValueText.height;
        const containerStrokeWidth = 2;

        scene.add.rectangle(posX + (containerWidth / 2) + (containerStrokeWidth / 2), posY + (containerHeight / 2) + (containerStrokeWidth / 2), containerWidth, containerHeight, ForegroundColor, 0).setStrokeStyle(containerStrokeWidth, ForegroundColor, 1);
        return this;
    }

    update(accountValue) {
        this.accountValueText.text = accountValue.toString();
        return this;
    }
};
