export const TextColor = "#222";
export const PageBackgroundColor = "#98E";
export const PhaserBackgroundColor = "#ddd";
export const LiteBackgroundColor = "#ccc";
export const ForegroundColor = "#EEE";
export const BorderColor = "#555";

const getDecimalEquivalent = (hexDigit) => {
    switch (hexDigit) {
        case "0":
            return 0;
        case "1":
            return 1;
        case "2":
            return 2;
        case "3":
            return 3;
        case "4":
            return 4;
        case "5":
            return 5;
        case "6":
            return 6;
        case "7":
            return 7;
        case "8":
            return 8;
        case "9":
            return 9;
        case "A":
            return 10;
        case "B":
            return 11;
        case "C":
            return 12;
        case "D":
            return 13;
        case "E":
            return 14;
        case "F":
            return 15;
        default:
            return 0;
    }
}

const convertFromHEXToDecimal = (hex) => {
    if(hex.length >= 2) {
        const firstValue = getDecimalEquivalent(hex[0]) * (16);
        const secondValue = getDecimalEquivalent(hex[1]);
        return firstValue + secondValue;
    }
    if(hex.length == 1) {
        const firstValue = getDecimalEquivalent(hex[0]) * (16);
        const secondValue = getDecimalEquivalent(hex[0]);
        return firstValue + secondValue;
    }
    return 0;
}

export const toPhaserColor = (color) => {
    const hashFormatRegex = /#([0-9A-Fa-z])([0-9A-Fa-z])([0-9A-Fa-z])/;

    if (hashFormatRegex.test(color)) {
        const [_, red, green, blue] = color.match(hashFormatRegex);
        const [redConverted, greenConverted, blueConverted] = [convertFromHEXToDecimal(red.toUpperCase()), convertFromHEXToDecimal(green.toUpperCase()), convertFromHEXToDecimal(blue.toUpperCase())]
        const newcolor = new Phaser.Display.Color(redConverted, greenConverted, blueConverted, 1);
        return newcolor.color;
    }

    return new Phaser.Display.Color(0, 0, 0, 1);
}

export default { TextColor, PageBackgroundColor, PhaserBackgroundColor, ForegroundColor, LiteBackgroundColor, BorderColor, toPhaserColor };
