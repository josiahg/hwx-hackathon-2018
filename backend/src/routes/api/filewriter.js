var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').post((req, res) => {
    var fs = require("fs");
    var fileContent = JSON.stringify(req.body);

    fs.writeFile('./' + 'bp-temp-name' + '.json', fileContent, (err) => {
        if (err)
            res.json(err);
        else
            res.json('File created');
    });
});

router.route('/:filename').post((req, res) => {
    var fs = require("fs");
    var fileContent = JSON.stringify(req.body);

    fs.writeFile('./generated/bp-' + req.params.filename + '.json', fileContent, (err) => {
        if (err)
            res.json(err);
        else
            res.json('File created');
    });
});

router.route('/:filename/:contents').get((req, res) => {
    var fs = require("fs");
    var fileContent = Buffer.from(req.params.contents, 'base64').toString();

    fs.writeFile('./' + req.params.filename + '.json', fileContent, (err) => {
        if (err)
            res.json(err);
        else
            res.json('File created');
    });
});


module.exports = router;