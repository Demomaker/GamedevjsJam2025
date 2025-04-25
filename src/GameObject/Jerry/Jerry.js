export class Jerry extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.badAnnouncementCallbacks = [];
        this.goodAnnouncementCallbacks = [];

        this.jerryBody = scene.add.sprite(0, 0, 'jerry-body');
        this.jerryFace = scene.add.sprite(0, -60, 'jerry-face');
        this.jerryHair = scene.add.sprite(0, -100, 'jerry-hair');

        this.speechBubble = scene.add.graphics();
        this.speechBubble.fillStyle(0xFFFFFF, 0.7);
        this.speechBubble.lineStyle(4, 0x000000, 1);
        this.speechBubble.fillRoundedRect(-200, -250, 400, 120, 20);
        this.speechBubble.strokeRoundedRect(-200, -250, 400, 120, 20);
        this.speechBubble.fillStyle(0xFFFFFF, 0.7);
        this.speechBubble.fillTriangle(-50, -130, -20, -130, -40, -110);
        this.speechBubble.lineStyle(4, 0x000000, 1);
        this.speechBubble.strokeTriangle(-50, -130, -20, -130, -40, -110);

        this.speechText = scene.add.text(-180, -230, "", {
            font: "18px Arial",
            fill: "#000000",
            wordWrap: { width: 360 }
        });

        this.add([this.jerryBody, this.jerryFace, this.jerryHair, this.speechBubble, this.speechText]);

        this.setSize(200, 300);
        this.setInteractive();

        scene.add.existing(this);

        this.nextSpeechTime = 0;
        this.speechDuration = 5000; // How long speeches stay visible
        this.speechInterval = 15000; // How often Jerry speaks

        this.isAnimating = false;

        this.hideSpeechBubble();

        this.positiveQuotes = [
            "BREAKING: Tech stocks soaring to the moon! 🚀",
            "WOW! Markets hitting ALL-TIME highs!",
            "UNBELIEVABLE returns in energy sector!",
            "BUY BUY BUY! This market is HOT! 🔥",
            "Inflation numbers WAY down! Market loves it!",
            "Bulls on parade! Market confidence at 10-year high!"
        ];

        this.negativeQuotes = [
            "PANIC! Market crash incoming! 📉",
            "SELL NOW! Major bank declares bankruptcy!",
            "RECESSION confirmed by leading economists!",
            "Interest rates SKYROCKETING overnight!",
            "Tech bubble BURSTING as we speak!",
            "Foreign markets in FREEFALL! Contagion spreading!"
        ];
    }

    preload() {
        this.scene.load.image('jerry-body', 'assets/jerry-body-2.png');
        this.scene.load.image('jerry-face', 'assets/jerry-face-2.png');
        this.scene.load.image('jerry-hair', 'assets/jerry-hair-2.png');
    }

    update(time) {
        if (time > this.nextSpeechTime) {
            this.makeMarketAnnouncement();
            this.nextSpeechTime = time + this.speechInterval;

            this.scene.time.delayedCall(this.speechDuration, () => {
                this.hideSpeechBubble();
            });
        }

        if (this.isAnimating) {
            this.speechBubble.visible = true;
            this.speechText.visible = true;
        }
    }

    addGoodAnnouncementCallback(callback) {
        this.goodAnnouncementCallbacks.push(callback);
        return this;
    }

    addBadAnnouncementCallback(callback) {
        this.badAnnouncementCallbacks.push(callback);
        return this;
    }

    makeMarketAnnouncement() {
        const isGoodNews = Math.random() > 0.5;

        const quote = isGoodNews
        ? this.positiveQuotes[Math.floor(Math.random() * this.positiveQuotes.length)]
        : this.negativeQuotes[Math.floor(Math.random() * this.negativeQuotes.length)];

        this.showSpeechBubble(quote);

        if (isGoodNews) {
            for(const callback of this.goodAnnouncementCallbacks) {
                callback();
            }
        } else {
            for(const callback of this.badAnnouncementCallbacks) {
                callback();
            }
        }
    }

    showSpeechBubble(text) {
        this.speechText.setText(text);
        this.speechBubble.visible = true;
        this.speechText.visible = true;
    }

    hideSpeechBubble() {
        this.speechBubble.visible = false;
        this.speechText.visible = false;
    }

    forceAnnouncement(isPositive = true) {
        if (isPositive) {
            const quote = this.positiveQuotes[Math.floor(Math.random() * this.positiveQuotes.length)];
            this.showSpeechBubble(quote);
            for(const callback of this.goodAnnouncementCallbacks) {
                callback();
            }
        } else {
            const quote = this.negativeQuotes[Math.floor(Math.random() * this.negativeQuotes.length)];
            this.showSpeechBubble(quote);
            for(const callback of this.badAnnouncementCallbacks) {
                callback();
            }
        }

        this.nextSpeechTime = this.scene.time.now + this.speechInterval;

        this.scene.time.delayedCall(this.speechDuration, () => {
            this.hideSpeechBubble();
        });
    }

    addPositiveQuote(quote) {
        this.positiveQuotes.push(quote);
    }

    addNegativeQuote(quote) {
        this.negativeQuotes.push(quote);
    }

    setAnnouncementFrequency(milliseconds) {
        this.speechInterval = milliseconds;
    }
}
