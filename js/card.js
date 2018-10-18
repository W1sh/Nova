// jshint esversion: 6
class Card{
    constructor(name, manaCost, type, set, rarity, power, toughness){
        this.name = name;
        this.manaCost = (manaCost !== undefined ? manaCost : "");
        this.type = type;
        this.set = set;
        this.rarity = rarity;
        this.power = (power !== undefined ? power : "");
        this.toughness = (toughness !== undefined ? toughness : "");
    }
}