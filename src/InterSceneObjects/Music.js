export class Music {
    static music = null;

    static isNull() {
        return Music.music == null;
    }

    static setMusic(music) {
        Music.music = music;
    }
}
