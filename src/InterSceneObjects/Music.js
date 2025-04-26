export class Music {
    static music = null;
    static isPlaying = false;

    static isNull() {
        return Music.music == null;
    }

    static setMusic(music) {
        Music.music = music;
        Music.music.setLoop(true);
    }

    static play() {
        Music.music.play();
        Music.isPlaying = true;
    }

    static stop() {
        Music.music.stop();
        Music.isPlaying = false;
    }

    static pause() {
        Music.music.pause();
        Music.isPlaying = false;
    }

    static isItPlaying() {
        return Music.isPlaying;
    }
}
