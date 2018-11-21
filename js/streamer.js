//jshint esversion: 6
const {streamArray} = require('stream-json/streamers/StreamArray');
const {parser} = require('stream-json');
const {chain} = require('stream-chain');
const fs = require('fs');

function parseJsonData(callback) {
    const pipeline = chain([
        fs.createReadStream('assets/test.json'),
        parser(),
        streamArray()
    ]);
    let objectCounter = 0;

    pipeline.on('data', data => {
        objectCounter++;
        results.push(new Card(data.value.name, data.value.mana_cost, data.value.type_line,
            data.value.set_name, data.value.rarity, data.value.power, data.value.toughness));
    });

    pipeline.on('end', () => {
        if(callback !== undefined) callback();
        console.log(objectCounter + " objects pushed into the results array");
    });

    pipeline.on("error", function (err) {
        console.log("error !!!");
    });
}

function filterResults() {
    let counter = 0;
    for (let row of table.getElementsByTagName("tr")) {
        let containsColor = true;
        let containsRarity = true;
        if (filter[0] !== "none") {
            containsColor = false;
            for (let child of row.firstChild.children) {
                if (child.classList.contains(filter[0])) {
                    containsColor = true;
                }
            }
        }
        if (filter[1] !== "none") {
            containsRarity = false;
            if (row.cells[4].firstChild.classList.contains(filter[1])) {
                containsRarity = true;
            }
        }
        if (containsColor && containsRarity) {
            row.style.display = "";
            counter++;
        } else {
            row.style.display = "none";
        }
    }
    let resultsFoundText = document.getElementById("resultsFoundText");
    resultsFoundText.innerText = counter + " results found";
}