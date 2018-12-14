// Template file for api route
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').post((req, res) => {
    // Expects the following in body: cb_url, token, bp_base64, cluster_name
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    var request = require("request");
    var options = {
        method: 'POST',
        url: ''+ req.body.cb_url + '/cb/api/v1/blueprints/user',
        
        headers:
        {
            'cache-control': 'no-cache',
            'Authorization': 'Bearer ' + req.body.token,
            'Content-Type': 'application/json'
        },
        body:
        {
            ambariBlueprint: '' + req.body.bp_base64,
            description: 'Blueprint for ' + req.body.cluster_name,
            inputs: [],
            tags: {},
            name: '' + req.body.cluster_name,
            hostGroupCount: 1,
            status: 'USER_MANAGED',
            public: true
        },
        json: true
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send(body)
    });

});

module.exports = router;