//jshint esversion: 6
const {streamArray} = require('stream-json/streamers/StreamArray');
const {parser} = require('stream-json');
const {chain} = require('stream-chain');
const fs = require('fs');

function populateTable(filter){
    const pipeline = chain([
        fs.createReadStream('assets/test.json'),
        parser(),
        streamArray()
    ]);
    let objectCounter = 0;
    let objectsInsertedCounter = 0;

    pipeline.on('data', data => {
        objectCounter++;
        console.log(data);
        if(objectsInsertedCounter < 50 ) {
            if(filter !== undefined){
                if(data.value.name.toLowerCase().includes(filter.toLowerCase())){
                    objectsInsertedCounter++;
                    insertTableRow(data.value.name, data.value.mana_cost, data.value.type_line,
                        data.value.set_name, data.value.rarity, data.value.power, data.value.toughness);
                }
            }else{
                objectsInsertedCounter++;
                    insertTableRow(data.value.name, data.value.mana_cost, data.value.type_line,
                        data.value.set_name, data.value.rarity, data.value.power, data.value.toughness);
            }
        }
    });

    pipeline.on('end', () => {
        console.log(objectCounter + " objects, " + objectsInsertedCounter + " objects inserted in the table.");
    });

    pipeline.on("error", function(err){
        console.log("error !!!");
    });
}