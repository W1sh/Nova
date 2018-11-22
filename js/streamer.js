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

function filterResults(){
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    if(filter.colors.length === 0 && filter.rarity.length === 0 && filter.name.length === 0 ){
        results.forEach((item) => {
            insertTableRow(item);
        });
        return;
    }
    let filteredResults = results.filter((item) => {
        let hasRarityInFilter = filter.rarity.includes(item.rarity);
        let hasColorsInFilter = filter.colors.length > 0 ? item.mana.containsColor(filter.colors) : true;
        let hasNameInFilter = filter.name.length > 0 ? item.name.includes(filter.name) : true;
        return hasRarityInFilter && hasColorsInFilter && hasNameInFilter;
    });
    filteredResults.forEach((item) => {
        insertTableRow(item);
    });
}