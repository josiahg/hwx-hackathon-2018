import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Recipe from './models/Recipe'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

var pgp = require('pg-promise')({});
var db = pgp('postgres://postgres:pg_pass123!@db:5432/postgres');
var request = require('request');
    

const connection = mongoose.connection;

function connectWithRetry(url) {
    mongoose.connect(url).then(
        () => { connection.once('open', () => {
                    console.log('MongoDB database connection to ' + url + ' established successfully!');
                });},
        err => { 
            console.log('Could not connect to ' + url + ' - Retrying in 5 seconds.');
            setTimeout(connectWithRetry.bind(null, url), 5000);
        }
    );        
};

connectWithRetry('mongodb://mongo/recipes');

router.route('/cluster').get((req,res) => {
    db.any('select * from cloudbreak_cuisine.clusters')
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});

router.route('/cluster/:id').get((req,res) => {
    db.any('select * from cloudbreak_cuisine.clusters where id = ' + req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});


router.get('/load_blueprint/:cb_url/:cluster_name/:bp_base64/:token', function(req, res){ 

    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 

    var request = require("request");

var options = { method: 'POST',
  url: 'https://'+req.params.cb_url+'/cb/api/v1/blueprints/user',
  headers: 
   { 'cache-control': 'no-cache',
     Authorization: 'Bearer ' + req.params.token,
     'Content-Type': 'application/json' },
  body: 
   { ambariBlueprint: '' + req.params.bp_base64,
     description: 'Blueprint for ' + req.params.cluster_name,
     inputs: [],
     tags: {},
     name: ''+req.params.cluster_name,
     hostGroupCount: 1,
     status: 'USER_MANAGED',
     public: true },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  res.send(body)
});

})


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

router.route('/services/:id/mandatory').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services where associated_cluster = ' + req.params.id + ' and mandatory = 1')
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

router.route('/recipes').get((req, res) => {
    Recipe.find((err, recipes) => {
        if (err)
            console.log(err);
        else
            res.json(recipes);
    });
});

router.route('/recipes/:id').get((req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err)
            console.log(err);
        else
            res.json(recipe);
    })
});

router.route('/recipes/add').post((req, res) => {
    let recipe = new Recipe(req.body);
    recipe.save()
        .then(recipe => {
            res.status(200).json({'recipe': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new recipe');
        });
});

router.route('/recipes/update/:id').post((req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (!recipe)
            return next(new Error('Could not load Document'));
        else {
            recipe.name = req.body.name;
            recipe.description = req.body.description;
            recipe.code = req.body.code;
            recipe.save().then(recipe => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/recipes/delete/:id').get((req, res) => {
    Recipe.findByIdAndRemove({_id: req.params.id}, (err, recipe) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));