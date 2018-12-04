import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Recipe from './models/Recipe'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

const connection = mongoose.connection;

function connectWithRetry() {
    mongoose.connect('mongodb://mongo/recipes').then(
        () => { connection.once('open', () => {
                    console.log('MongoDB database connection established successfully!');
                });},
        err => { 
            console.log('Could not connect to DB. Retrying in 5 seconds.');
            setTimeout(connectWithRetry, 5000);
        }
    );        
};

connectWithRetry();


router.route('/recipes').get((req, res) => {
    Recipe.find((err, recipes) => {
        if (err)
            console.log(err);
        else
            res.json(recipes);
    });
});

router.route('/recipes/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, recipe) => {
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