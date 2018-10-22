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
}; // onload

function initSidebar(){
    let as = document.getElementsByClassName("nav-group-item");
    let navMasterpieces = as[0];
    navMasterpieces.onclick = function(){
        focus(this, as);
    }; // navMasterpieces.onclick
    let navMythics = as[1];
    navMythics.onclick = function(){
        focus(this, as);
    }; // navMythics.onclick
    let navRares = as[2];
    navRares.onclick = function(){
        focus(this, as);
    }; // navRares.onclick
    let navUncommons = as[3];
    navUncommons.onclick = function(){
        focus(this, as);
    }; // navUncommons.onclick
    let navCommons = as[4];
    navCommons.onclick = function(){
        focus(this, as);
    }; // navCommons.onclick
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
        }; // newAElement.onmousedown
        let txtA = document.createTextNode("New deck");
        newAElement.appendChild(txtA);
        deckNavBar.appendChild(newAElement);
    }; // navNewDeck.onclick
} // initSidebar

function initPane(){
    let textSearchBar = $("searcher");
    let counter = 0;
    textSearchBar.onkeyup = function(){
        console.log(this.value);
        //filterResults(this.value);
    }; // textSearchBar.onkeyup
    table = document.getElementsByTagName("tbody")[0];
    pipeline.on('data', data => {
        counter++;
        console.log(data.value.name);
        insertTableRow(data.value.name, data.value.mana_cost, data.value.type_line,
            data.value.set_name, data.value.rarity, data.value.power, data.value.toughness);
    });
    pipeline.on('finish', () => {
        console.log(counter, 'objects');
    });
    
} // initPane

function insertTableRow(name, manaCost, type, set, rarity, power, toughness) {
    let row = table.insertRow(0);
    row.onclick = function(){
        if(this.classList.contains("selected")){
            row.classList.remove("selected");
        }else{
            for(let row of this.parentElement.getElementsByTagName("tr")){
                if(row.classList.contains("selected")){
                    row.classList.remove("selected");
                }
            }
            row.classList.add("selected");
        }
    }; // row.onclick
    
    let cellName = row.insertCell(0);
    cellName.appendChild(document.createTextNode(name));

    let cellManaCost = row.insertCell(1);
    cellManaCost.className = "cell-center";
    cellManaCost.appendChild(document.createTextNode(manaCost));

    let cellType = row.insertCell(2);
    cellType.className = "cell-center";
    cellType.appendChild(document.createTextNode(type));

    let cellSet = row.insertCell(3);
    cellSet.className = "cell-center";
    cellSet.appendChild(document.createTextNode(set));

    let cellRarity = row.insertCell(4);
    cellRarity.className = "cell-center";
    let iconRarity = document.createElement("span");
    iconRarity.className = "icon icon-record " + rarity;
    cellRarity.appendChild(iconRarity);

    let cellPT = row.insertCell(5);
    cellPT.className = "cell-center";
    cellPT.appendChild(document.createTextNode(power + "|" + toughness));
} // insertTableRow

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
} // focus

function $(query) {
    let element = document.getElementById(query);
    let bool = element !== null;
    if (!bool) {
        alert("Could not load element with id: " + query);
        failed = true;
        return;
    }
    return element;
} // $