// jshint esversion: 6
class Card{
    constructor(name, manaCost, type, subType, rarity, power, toughness){
        this.name = name;
        this.manaCost = (manaCost !== undefined ? manaCost : "");
        this.type = type;
        this.subType = (subType !== undefined ? subType : "");
        this.rarity = rarity;
        this.power = (power !== undefined ? power : "");
        this.toughness = (toughness !== undefined ? toughness : "");
    }

    objectAsTableEntry(cellName, cellManaCost, cellType, cellSubType, cellRarity, cellPT){
        let txtName = document.createTextNode(this.name);
        cellName.appendChild(txtName);
        let txtManaCost = document.createTextNode(this.manaCost);
        cellManaCost.appendChild(txtManaCost);
        let txtType = document.createTextNode(this.type);
        cellType.appendChild(txtType);
        let txtSubType = document.createTextNode(this.subType);
        cellSubType.appendChild(txtSubType);
        let txtRarity = document.createTextNode(this.rarity);
        cellRarity.appendChild(txtRarity);
        let txtPT = document.createTextNode(this.power + " " + this.toughness);
        cellPT.appendChild(txtPT);
        return [cellName, cellManaCost, cellType, cellSubType, cellRarity, cellPT];
    }
}