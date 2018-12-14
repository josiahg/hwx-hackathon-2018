import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

/*var pgp = require('pg-promise')({});
var db = pgp('postgres://postgres:pg_pass123!@db:5432/postgres');*/

const initDb = require('./src/pg-db').initDb;
const getDb = require('./src/pg-db').getDb;

initDb();

const db = getDb();

router.route('/get_token').post((req, res) => {
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

router.get('/load_recipe/:cb_url/:recipe_name/:recipe_type/:recipe_base64/:token', function (req, res) {
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

router.route('/load_blueprint').post((req, res) => {
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

router.route('/custom_extras').get((req, res) => {
    db.any("select recipe_description as name, extra_type, case when pre_ambari_start is not null then 'Pre Ambari Start' when post_ambari_start is not null then 'Post Ambari Start' when post_cluster_install is not null then 'Post Cluster Install' else 'Pre Termination' end as recipe_type, case when pre_ambari_start is not null then pre_ambari_start when post_ambari_start is not null then post_ambari_start when post_cluster_install is not null then post_cluster_install else on_termination end as code from cloudbreak_cuisine.components_recipes where extra_type != 'Standard'")
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/set_custom_recipe').post((req, res) => {   
    db.any('insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, '+req.body.recType+') values (\''+ req.body.service_id + '\',\'' + req.body.recipe_description + '\',\'' + req.body.extra_type + '\',\'' + req.body.recipe + '\')')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/library').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.external_bundles')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/blueprint_recipes/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.components_recipes where service_id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/createsh/:filename').post((req, res) => {
    var fs = require("fs");
    var exec = require('child_process').exec;

    var fn = req.params.filename + '.sh';
    var files = req.body;

    var execStr = "";
    files.forEach(file => {
        console.log(file)
        execStr += "cat ./scripts/" + file + " >> ./generated/" + fn + "; ";
    });
    exec(execStr, function (error, stdout, stderr) {
        if (!error) {
            res.json("Success!");
        } else {
            res.json(stderr)
        }
    })
});

router.route('/create_bundle/:name').get((req, res) => {
    var fs = require('fs');
    var archiver = require('archiver');
    var output = fs.createWriteStream('./generated/bundle/'+req.params.name+'.zip');
    var archive = archiver('zip');

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    
    archive.on('error', function(err){
        throw err;
    });
    
    archive.pipe(output);
    archive.glob('./generated/*.sh');
    archive.glob('./generated/*.json');
    archive.finalize();

    res.json("Bundle " + req.params.name + " created");
});

router.route('/download/:name').get((req, res) => {
    res.download('./generated/bundle/'+req.params.name+'.zip');
});

app.use(require('./src/routes'));
app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
