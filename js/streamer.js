//jshint esversion: 6
const {
    streamArray
} = require('stream-json/streamers/StreamArray');
const {
    parser
} = require('stream-json');
const {
    chain
} = require('stream-chain');
const fs = require('fs');

function populateTable(filter) {
    const pipeline = chain([
        fs.createReadStream('assets/test.json'),
        parser(),
        streamArray()
    ]);
    let objectCounter = 0,
        objectsInsertedCounter = 0;

    pipeline.on('data', data => {
        objectCounter++;
        console.log(data);
        if (objectsInsertedCounter < 50) {
            if (filter !== undefined) {
                if (data.value.name.toLowerCase().includes(filter.toLowerCase())) {
                    objectsInsertedCounter++;
                    insertTableRow(data.value.name, data.value.mana_cost, data.value.type_line,
                        data.value.set_name, data.value.rarity, data.value.power, data.value.toughness);
                }
            } else {
                objectsInsertedCounter++;
                insertTableRow(data.value.name, data.value.mana_cost, data.value.type_line,
                    data.value.set_name, data.value.rarity, data.value.power, data.value.toughness);
            }
        }
    });

    pipeline.on('end', () => {
        console.log(objectCounter + " objects, " + objectsInsertedCounter + " objects inserted in the table.");
    });

    pipeline.on("error", function (err) {
        console.log("error !!!");
    });
}

function filterResultsByColor(table, filter, active) {
    for (let row of table.getElementsByTagName("tr")) {
        let contains = false;
        for (let child of row.firstChild.children) {
            if (child.classList.contains(filter)) {
                contains = true;
            }
        }
        if (!contains) {
            if(active){
                row.style.display = "";
            }else{
                row.style.display = "none";
            }
        }else{
            row.style.display = "";
        }
    }
}


function filterResultsByRarity(table, filter, active) {
    for (let row of table.getElementsByTagName("tr")) {
        if (row.cells[4].firstChild.classList.contains(filter)) {
            row.style.display = "";
        }else{
            if(active){
                row.style.display = "none";
            }else{
                row.style.display = "";
            }
        }
    }
}

function filterResults() {
    for (let row of table.getElementsByTagName("tr")) {
        let containsColor = true;
        let containsRarity = true;
        if(filter[0] !== "none"){
            containsColor = false;
            for (let child of row.firstChild.children) {
                if (child.classList.contains(filter[0])) {
                    containsColor = true;
                }
            }
        }
        if(filter[1] !== "none"){
            containsRarity = false;
            if (row.cells[4].firstChild.classList.contains(filter[1])) {
                containsRarity = true;
            }
        }
        if(containsColor && containsRarity){
            row.style.display = "";
        }else{
            row.style.display = "none";
        }
    }
}