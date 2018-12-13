import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

var pgp = require('pg-promise')({});
var db = pgp('postgres://postgres:pg_pass123!@db:5432/postgres');
var request = require('request');


router.route('/cbcreds/read').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.cb_credentials')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })

});


router.route('/cbcreds/set').post((req, res) => {



    db.any('insert into cloudbreak_cuisine.cb_credentials (instance_name, cb_url, cb_username, cb_password) values (\'' + req.body.instance_name + '\',\'' + req.body.cb_url + '\',\'' + req.body.cb_username + '\',\'' + req.body.cb_password + '\')')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/cbcreds/delete').post((req, res) => {


    db.any('delete from cloudbreak_cuisine.cb_credentials where id=' + req.body.cred_id)
        .then(data => {
            res.json("Credential with ID " + req.body.cred_id + " succesfully deleted.");
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


router.route('/cluster').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.clusters')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/cluster/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.clusters where id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});


router.route('/get_token/:username/:password/:cb_url', function (req, res) {

    // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 

    // var request = require("request");

    // var options = { method: 'POST',
    //   url: 'https://192.168.56.100/identity/oauth/authorize',
    //   qs: 
    //    { 'response_type': 'token',
    //      'client_id': 'cloudbreak_shell',
    //      'scope.0': 'openid',
    //      'source': 'login',
    //      'redirect_uri': 'http://cloudbreak.shell' },
    //   headers: 
    //    { 'accept': 'application/x-www-form-urlencoded' },
    //   data: 'credentials={"username":"pvidal@hortonworks.com","password":"HWseftw33#"}' };

    // request(options, function (error, response, body) {
    //   if (error) throw new Error(error);
    //   //res.send(body);
    //   var token = JSON.stringify(response);
    //   res.send(token);
    // });

    var exec = require('child_process').exec;

    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec("curl -k -iX POST -H \"accept: application/x-www-form-urlencoded\" -d 'credentials={\"username\":\"" + req.params.username + "\",\"password\":\"" + req.params.password + "\"}' \"https://" + req.params.cb_url + "/identity/oauth/authorize?response_type=token&client_id=cloudbreak_shell&scope.0=openid&source=login&redirect_uri=http://cloudbreak.shell\" | grep location | cut -d'=' -f 3 | cut -d'&' -f 1", function (error, stdout, stderr) {
        if (!error) {
            res.send(stdout);
        } else {
            res.send('ERROR: ' + stderr);
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
            Authorization: 'Bearer ' + req.body.token,
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


router.route('/services').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/services/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services where associated_cluster = ' + req.params.id + ' order by mandatory, service_description')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/services/:cluster_type/:description').get((req, res) => {
    db.any('select services.* from cloudbreak_cuisine.services services, cloudbreak_cuisine.clusters clusters where services.associated_cluster = clusters.id and clusters.cluster_type =\''+req.params.cluster_type+'\' and services.service_description = \''+req.params.description+'\'')
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


router.route('/services/:id/mandatory').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services where associated_cluster = ' + req.params.id + ' and mandatory = 1')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/services_distinct').get((req, res) => {
    db.any('select distinct services.service_description from cloudbreak_cuisine.services')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/components_blueprints').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.components_blueprints')
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/components_blueprints/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.components_blueprints where id = ' + req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

router.route('/components_blueprints/service/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.components_blueprints where service_id = ' + req.params.id)
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

router.route('/filewriter/:filename/:contents').get((req, res) => {
    var fs = require("fs");
    var fileContent = Buffer.from(req.params.contents, 'base64').toString();

    fs.writeFile('./' + req.params.filename + '.json', fileContent, (err) => {
        if (err)
            res.json(err);
        else
            res.json('File created');
    });
});

router.route('/filewriter').post((req, res) => {
    var fs = require("fs");
    var fileContent = JSON.stringify(req.body);

    fs.writeFile('./' + 'bp-temp-name' + '.json', fileContent, (err) => {
        if (err)
            res.json(err);
        else
            res.json('File created');
    });
});

router.route('/filewriter/:filename').post((req, res) => {
    var fs = require("fs");
    var fileContent = JSON.stringify(req.body);

    fs.writeFile('./generated/bp-' + req.params.filename + '.json', fileContent, (err) => {
        if (err)
            res.json(err);
        else
            res.json('File created');
    });
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

router.route('/createsh').post((req, res) => {
    var fs = require("fs");
    var body = JSON.stringify(req.body);
    var exec = require('child_process').exec;

    var filename = 'one-file.sh';
    var files = ['pas-utilities.sh', 'pas-druid.sh'];

    files.forEach(file => {
        /*exec("pwd", function(error, stdout,stderr) {
            if(!error) {
                console.log(stdout)
            } else {
                console.log(stderr)
            }
        })*/
        exec("cat ./scripts/" + file + " >> ./generated/" + filename, function (error, stdout, stderr) {
            if (!error) {
                console.log("Success!")
            } else {
                console.log(stderr)
            }
        })

    })
});

router.route('/download/:name').get((req, res) => {
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

    res.download('./generated/bundle/'+req.params.name+'.zip');
});


app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));