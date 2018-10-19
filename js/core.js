// jshint esversion: 6
const {streamArray} = require('stream-json/streamers/StreamArray');
const {parser} = require('stream-json');
const {pick}   = require('stream-json/filters/Pick');
const {chain} = require('stream-chain');
const fs = require('fs');

let table;
const pipeline = chain([
    fs.createReadStream('assets/test.json'),
    parser(),
    streamArray(),
]);

window.onload = function onload() {
    initSidebar();
    initPane();
};

function initSidebar(){
    let as = document.getElementsByClassName("nav-group-item");
    let navMasterpieces = as[0];
    navMasterpieces.onclick = function(){
        focus(this, as);
    };
    let navMythics = as[1];
    navMythics.onclick = function(){
        focus(this, as);
    };
    let navRares = as[2];
    navRares.onclick = function(){
        focus(this, as);
    };
    let navUncommons = as[3];
    navUncommons.onclick = function(){
        focus(this, as);
    };
    let navCommons = as[4];
    navCommons.onclick = function(){
        focus(this, as);
    };
    let navNewDeck = as[5];
    navNewDeck.onclick = function(){
        focus(undefined, as);
        let deckNavBar = $("deckNavBar");
        let newAElement = document.createElement("a");
        newAElement.className = "nav-group-item";
        newAElement.onmousedown = function(e){ 
            if(e.button === 0){
                focus(this, as);
            }else if(e.button === 2){
                focus(undefined, as);
            }
        };
        let txtA = document.createTextNode("New deck");
        newAElement.appendChild(txtA);
        deckNavBar.appendChild(newAElement);
    };
}

function initPane(){
    let textSearchBar = $("searcher");
    textSearchBar.onkeyup = function(){
        console.log(this.value);
        //filterResults(this.value);
    };
    table = document.getElementsByTagName("tbody")[0];
    pipeline.on('data', data => {
        console.log(data.value.name);
        insertTableRow(data.value.name, data.value.mana_cost, data.value.type_line,
            data.value.set_name, data.value.rarity, data.value.power, data.value.toughness);
    });
    //pipeline.on('finish', () => console.log(counter, 'objects'));
}

function insertTableRow(name, manaCost, type, set, rarity, power, toughness) {
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
    let cellSet = row.insertCell(3);
    let txtSet = document.createTextNode(set);
    cellSet.className = "cell-center";
    cellSet.appendChild(txtSet);
    let cellRarity = row.insertCell(4);
    cellRarity.className = "cell-center";
    let iconRarity = document.createElement("span");
    iconRarity.className = "icon icon-record " + rarity;
    cellRarity.appendChild(iconRarity);
    let cellPT = row.insertCell(5);
    let txtPT = document.createTextNode(power + "|" + toughness);
    cellPT.className = "cell-center";
    cellPT.appendChild(txtPT);
}

function focus(objectToFocus, objectsToUnfocus){
    if(objectToFocus !== undefined){
        objectToFocus.classList.add("active");
        for (let object of objectsToUnfocus) {
            if (object !== objectToFocus && object.classList.contains("active")) {
                object.classList.remove("active");
            }
        }
    }else{
        for (let object of objectsToUnfocus) {
            object.classList.remove("active");
        }
    }
}

function $(query) {
    let element = document.getElementById(query);
    let bool = element !== null;
    if (!bool) {
        alert("Could not load element with id: " + query);
        failed = true;
        return;
    }
    return element;
}