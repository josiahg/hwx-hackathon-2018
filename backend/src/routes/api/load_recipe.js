// Template file for api route
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.get('/:cb_url/:recipe_name/:recipe_type/:recipe_base64/:token', function (req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://' + req.params.cb_url + '/cb/api/v1/recipes/user',
        headers:
        {
            'cache-control': 'no-cache',
            Authorization: 'Bearer ' + req.params.token,
            'Content-Type': 'application/json'
        },
        body:
        {
            name: '' + req.params.recipe_name,
            description: '' + req.params.recipe_type + 'recipe: ' + req.params.cluster_name,
            recipeType: '' + req.params.recipe_type,
            content: '' + req.params.recipe_base64,
            uri: ''
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send(body)
    });
})

module.exports = router;