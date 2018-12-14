// Template file for api route
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/:name').get((req, res) => {
    var fs = require('fs');
    var archiver = require('archiver');
    var output = fs.createWriteStream('./generated/bundle/'+req.params.name+'.zip');
    var archive = archiver('zip');

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    
    archive.on('error', function(err){
        throw err;
    });
    
    archive.pipe(output);
    archive.glob('./generated/*.sh');
    archive.glob('./generated/*.json');
    archive.finalize();

    res.json("Bundle " + req.params.name + " created");
});

module.exports = router;