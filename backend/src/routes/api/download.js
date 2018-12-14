// Template file for api route
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/:name').get((req, res) => {
    res.download('./generated/bundle/'+req.params.name+'.zip');
});

module.exports = router;