var router = require('express').Router();

router.use('/blueprint_recipes', require('./blueprint_recipes'));
router.use('/cbcreds', require('./cbcreds'));
router.use('/cluster', require('./cluster'));
router.use('/components_blueprints', require('./components_blueprints'));
router.use('/create_bundle', require('./create_bundle'));
router.use('/createsh', require('./createsh'));
router.use('/custom_extras', require('./custom_extras'));
router.use('/download', require('./download'));
router.use('/filewriter', require('./filewriter'));
router.use('/get_token', require('./get_token'));
router.use('/library', require('./library'));
router.use('/load_blueprint', require('./load_blueprint'));
router.use('/load_recipe', require('./load_recipe'));
router.use('/services_distinct', require('./services_distinct'));
router.use('/services', require('./services'));
router.use('/set_custom_recipe', require('./set_custom_recipe'));


module.exports = router;