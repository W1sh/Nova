// jshint esversion: 6
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/magicCards_db";

function connectDatabase() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        console.log("Connected");
        db.close();
    });
}

function insertIntoDatabase(object) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        let dbo = db.db("magicCards_db");
        queryDatabase({name: object.name}, function (results) {
            if (results.length > 0) {
                console.log("Object already exists within database");
                db.close();
                return;
            } else {
                dbo.collection("cards").insertOne(object, function (err, res) {
                    if (err) throw err;
                    console.log("1 object inserted");
                    db.close();
                });
            }
        });
    });
}

function queryDatabase(query, callback) {
    let results = [];
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        let dbo = db.db("magicCards_db");
        let q = (query !== undefined ? query : "{}");
        dbo.collection("cards").find(q).forEach(function (item) {
            results.push(item);
            console.log(results.length);
        }, function () {
            db.close();
            console.log(results);
            if (callback !== undefined) callback(results);
            return results;
        });
    });
}

function deleteObjectDatabase(query) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        if (query === undefined) return;
        var dbo = db.db("magicCards_db");
        dbo.collection("cards").deleteOne(query, function (err, obj) {
            if (err) throw err;
            console.log("1 object deleted");
            db.close();
        });
    });
}

function deleteManyObjectsDatabase(query) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        if (query === undefined) return;
        var dbo = db.db("magicCards_db");
        dbo.collection("cards").deleteMany(query, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " object(s) deleted");
            db.close();
        });
    });
}