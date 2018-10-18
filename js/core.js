// jshint esversion: 6
let table;

window.onload = function onload() {
    connectDatabase();
    console.log($("tbody")[0]);
    table = $("tbody")[0];
    queryDatabase("{}", function (results) {
        console.log(results);
        for(let object in results){
            insertTableRow(object.name, object.manaCost, object.type, object.subtype,
            object.rarity, object.power, object.toughness);
        }
    });
    //let test = new Card("Ponder", "B", "Instant", undefined, "common", undefined, undefined);
    // Create an empty <tr> element and add it to the 1st position of the table:
    //insertTableRow(test);
    //insertIntoDatabase(test);
    //deleteManyObjectsDatabase({name: "Ponder"});
};

function insertTableRow(name, manaCost, type, subType, rarity, power, toughness) {
    let row = table.insertRow(0);

    let cellName = row.insertCell(0);
    let txtName = document.createTextNode(name);
    cellName.appendChild(txtName);
    let cellManaCost = row.insertCell(1);
    let txtManaCost = document.createTextNode(manaCost);
    cellManaCost.className = "cell-center";
    cellManaCost.appendChild(txtManaCost);
    let cellType = row.insertCell(2);
    let txtType = document.createTextNode(type);
    cellType.className = "cell-center";
    cellType.appendChild(txtType);
    let cellSubType = row.insertCell(3);
    let txtSubType = document.createTextNode(subType);
    cellSubType.className = "cell-center";
    cellSubType.appendChild(txtSubType);
    let cellRarity = row.insertCell(4);
    cellRarity.className = "cell-center";
    let iconRarity = document.createElement("span");
    iconRarity.className = "icon icon-record " + rarity;
    cellRarity.appendChild(iconRarity);
    let cellPT = row.insertCell(5);
    let txtPT = document.createTextNode(power + " " + toughness);
    cellPT.className = "cell-center";
    cellPT.appendChild(txtPT);
}

function insertTableRow(card) {
    let row = table.insertRow(0);

    let cellName = row.insertCell(0);
    let txtName = document.createTextNode(card.name);
    cellName.appendChild(txtName);
    let cellManaCost = row.insertCell(1);
    let txtManaCost = document.createTextNode(card.manaCost);
    cellManaCost.className = "cell-center";
    cellManaCost.appendChild(txtManaCost);
    let cellType = row.insertCell(2);
    let txtType = document.createTextNode(card.type);
    cellType.className = "cell-center";
    cellType.appendChild(txtType);
    let cellSubType = row.insertCell(3);
    let txtSubType = document.createTextNode(card.subType);
    cellSubType.className = "cell-center";
    cellSubType.appendChild(txtSubType);
    let cellRarity = row.insertCell(4);
    cellRarity.className = "cell-center";
    let iconRarity = document.createElement("span");
    iconRarity.className = "icon icon-record " + card.rarity;
    cellRarity.appendChild(iconRarity);
    let cellPT = row.insertCell(5);
    let txtPT = document.createTextNode(card.power + " " + card.toughness);
    cellPT.className = "cell-center";
    cellPT.appendChild(txtPT);
}

function $(query) {
    let element = document.getElementsByTagName(query);
    let bool = element !== null;
    if (!bool) {
        alert("Could not load element with id: " + query);
        failed = true;
        return;
    }
    return element;
}