var router = require('express').Router();

router.use('/api', require('./api'));

// Temporary for backwards compat

router.use('/blueprint_recipes', require('./api/blueprint_recipes'));
router.use('/cbcreds', require('./api/cbcreds'));
router.use('/cluster', require('./api/cluster'));
router.use('/components_blueprints', require('./api/components_blueprints'));
router.use('/create_bundle', require('./api/create_bundle'));
router.use('/createsh', require('./api/createsh'));
router.use('/custom_extras', require('./api/custom_extras'));
router.use('/download', require('./api/download'));
router.use('/filewriter', require('./api/filewriter'));
router.use('/get_token', require('./api/get_token'));
router.use('/library', require('./api/library'));
router.use('/load_blueprint', require('./api/load_blueprint'));
router.use('/load_recipe', require('./api/load_recipe'));
router.use('/services_distinct', require('./api/services_distinct'));
router.use('/services', require('./api/services'));
router.use('/set_custom_recipe', require('./api/set_custom_recipe'));


// End temporary

module.exports = router;