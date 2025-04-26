export class GameProgress {
    constructor() {
        this.hasBoughtConsole = false;
        this.hasBoughtHouse = false;
        this.hasBoughtCar = false;
        this.hasBoughtGuitar = false;
    }

    buyConsole() {
        this.hasBoughtConsole = true;
        return this;
    }


    buyHouse() {
        this.hasBoughtHouse = true;
        return this;
    }

    buyCar() {
        this.hasBoughtCar = true;
        return this;
    }

    buyGuitar() {
        this.hasBoughtGuitar = true;
        return this;
    }

    allItemsBought() {
        return this.hasBoughtCar && this.hasBoughtHouse && this.hasBoughtConsole && this.hasBoughtGuitar;
    }
}
