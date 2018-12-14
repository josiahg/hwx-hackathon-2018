// Template file for api route
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').post((req, res) => {   
    db.any('insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, '+req.body.recType+') values (\''+ req.body.service_id + '\',\'' + req.body.recipe_description + '\',\'' + req.body.extra_type + '\',\'' + req.body.recipe + '\')')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

module.exports = router;