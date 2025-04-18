import { TextColor } from './Colors.js';

export const AddTitleText = (scene, posX, posY, text) => {
    return AddText(scene, posX, posY, text, '32px');
};

export const AddNormalText = (scene, posX, posY, text) => {
    return AddText(scene, posX, posY, text, '14px');
}

export const AddText = (scene, posX, posY, text, fontSize) => {
    return scene.add.text(posX, posY, text, {
        fontSize: fontSize,
        fill: TextColor
    });
};
