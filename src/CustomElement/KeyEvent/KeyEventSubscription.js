export class KeyEventSubscription {
    static subscribers = [];
    static reservedKeyCodes = [];
    static keyboardReserved = false;
    static subscribe(subscriber) {
        KeyEventSubscription.subscribers.push(subscriber);
    }

    static triggerEvent(keyCode) {
        for(const subscriber of KeyEventSubscription.subscribers) {
            subscriber("trigger", keyCode);
        }
    }

    static reserveKeyCode(keyCode) {
        for(const subscriber of KeyEventSubscription.subscribers) {
            subscriber("reserved", keyCode);
        }

        KeyEventSubscription.resevedKeyCodes.push(keyCode);
    }

    static freeKeyCode(keyCode) {
        for(const subscriber of KeyEventSubscription.subscribers) {
            subscriber("free", keyCode);
        }

        KeyEventSubscription.reservedKeyCodes = KeyEventSubscription.reservedKeyCodes.filter(x => x === keyCode);
    }

    static reserveKeyboard() {
        KeyEventSubscription.keyboardReserved = true;
    }

    static freeKeyboard() {
        KeyEventSubscription.keyboardReserved = false;
    }

    static isKeyboardReserved() {
        return KeyEventSubscription.keyboardReserved;
    }

    static isReserved(keyCode) {
        return KeyEventSubscription.reservedKeyCodes.contains(keyCode);
    }


}
