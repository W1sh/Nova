// jshint esversion: 6
class Card {
    constructor(name, mana, type, set, rarity, power, toughness) {
        this.name = name;
        this.mana = new Mana(mana);
        this.type = type;
        this.set = set;
        this.rarity = rarity;
        this.power = (power !== undefined ? power : "");
        this.toughness = (toughness !== undefined ? toughness : "");
    }
}

class Mana {
    constructor(givenCost) {
        this.cost = {
            'colorless': 0,
            'white': 0,
            'red': 0,
            'green': 0,
            'black': 0,
            'blue': 0
        };

        givenCost.replace(/[{}]/g, "").split('').forEach((item) => {
            switch (item) {
                case "W":
                    this.cost.white++;
                    break;
                case "R":
                    this.cost.red++;
                    break;
                case "G":
                    this.cost.green++;
                    break;
                case "B":
                    this.cost.black++;
                    break;
                case "U":
                    this.cost.blue++;
                    break;
                default:
                    this.cost.colorless += parseInt(item);
                    break;
            }
        });
    }

    convertedManaCost() {
        return this.cost.colorless + this.cost.white + this.cost.red +
            this.cost.green + this.cost.black + this.cost.blue;
    }

    hasColorless() {
        return this.cost.colorless > 0;
    }

    hasWhite() {
        return this.cost.white > 0;
    }

    hasRed() {
        return this.cost.red > 0;
    }

    hasGreen() {
        return this.cost.green > 0;
    }

    hasBlack() {
        return this.cost.black > 0;
    }

    hasBlue() {
        return this.cost.blue > 0;
    }

    toString() {
        let manaString = (this.cost.colorless > 0) ? this.cost.colorless : "";
        for (let i = 0; i < this.cost.white; i++) {
            manaString += "W";
        }
        for (let i = 0; i < this.cost.red; i++) {
            manaString += "R";
        }
        for (let i = 0; i < this.cost.green; i++) {
            manaString += "G";
        }
        for (let i = 0; i < this.cost.blue; i++) {
            manaString += "U";
        }
        for (let i = 0; i < this.cost.black; i++) {
            manaString += "B";
        }
        return manaString;
    }
}