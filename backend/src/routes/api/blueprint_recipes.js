// Template file for api route
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.components_recipes where service_id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

module.exports = router;