var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services where associated_cluster = ' + req.params.id + ' order by mandatory, service_description')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/:cluster_type/:description').get((req, res) => {
    db.any('select services.* from cloudbreak_cuisine.services services, cloudbreak_cuisine.clusters clusters where services.associated_cluster = clusters.id and clusters.cluster_type =\''+req.params.cluster_type+'\' and services.service_description = \''+req.params.description+'\'')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/:id/mandatory').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services where associated_cluster = ' + req.params.id + ' and mandatory = 1')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

module.exports = router;