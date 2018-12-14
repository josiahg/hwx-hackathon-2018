// TODO: merge this into /services
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any('select distinct services.service_description from cloudbreak_cuisine.services')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

module.exports = router;