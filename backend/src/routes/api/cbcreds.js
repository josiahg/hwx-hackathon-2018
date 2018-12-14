var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/read').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.cb_credentials')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/set').post((req, res) => {
    db.any('insert into cloudbreak_cuisine.cb_credentials (instance_name, cb_url, cb_username, cb_password) values (\'' + req.body.instance_name + '\',\'' + req.body.cb_url + '\',\'' + req.body.cb_username + '\',\'' + req.body.cb_password + '\')')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/delete').post((req, res) => {
    db.any('delete from cloudbreak_cuisine.cb_credentials where id=' + req.body.cred_id)
        .then(data => {
            res.json("Credential with ID " + req.body.cred_id + " succesfully deleted.");
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

module.exports = router;