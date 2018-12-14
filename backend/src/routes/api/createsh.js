// Template file for api route
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/:filename').post((req, res) => {
    var fs = require("fs");
    var exec = require('child_process').exec;

    var fn = req.params.filename + '.sh';
    var files = req.body;

    var execStr = "";
    files.forEach(file => {
        console.log(file)
        execStr += "cat ./scripts/" + file + " >> ./generated/" + fn + "; ";
    });
    exec(execStr, function (error, stdout, stderr) {
        if (!error) {
            res.json("Success!");
        } else {
            res.json(stderr)
        }
    })
});

module.exports = router;