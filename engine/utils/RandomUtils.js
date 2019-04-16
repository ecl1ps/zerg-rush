export class Random {
    static getRandom() {
        return Math.random();
    }
    static getRandomReal(min, max) {
        return Math.random() * (max - min) + min;
    }
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    static getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
    static getRandomBool() {
        return !!Random.getRandomIntInclusive(0, 1);
    }
}
//# sourceMappingURL=RandomUtils.js.map