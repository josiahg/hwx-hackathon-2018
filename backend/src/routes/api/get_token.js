// Template file for api route
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').post((req, res) => {
    var exec = require('child_process').exec;
    console.log(req.body);

    exec("curl -k -iX POST -H \"accept: application/x-www-form-urlencoded\" -d 'credentials={\"username\":\"" + req.body.username + "\",\"password\":\"" + req.body.password + "\"}' \"" + req.body.cb_url + "/identity/oauth/authorize?response_type=token&client_id=cloudbreak_shell&scope.0=openid&source=login&redirect_uri=http://cloudbreak.shell\" | grep location | cut -d'=' -f 3 | cut -d'&' -f 1", function (error, stdout, stderr) {
        if (!error) {
            res.json(stdout);
        } else {
            res.json('ERROR: ' + stderr);
        }
    });
})

module.exports = router;