export const TextColor = "#222";
export const PageBackgroundColor = "#98E";
export const PhaserBackgroundColor = "#ddd";
export const ForegroundColor = "#EEE";

export const toPhaserColor = (color) => {
    const hashFormatRegex = /#([0-9A-F])([0-9A-F])([0-9A-F])/;

    if (hashFormatRegex.test(color)) {
        const [red, green, blue] = color.match(hashFormatRegex);
        return new Phaser.Display.Color(red, green, blue, 1);
    }

    return new Phaser.Display.Color(0, 0, 0, 1);
}

export default { TextColor, PageBackgroundColor, PhaserBackgroundColor, ForegroundColor, toPhaserColor };
