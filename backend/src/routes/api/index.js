var router = require('express').Router();

router.use('/cbcreds', require('./cbcreds'));
router.use('/cluster', require('./cluster'));
router.use('/services', require('./services'));
router.use('/services_distinct', require('./services_distinct'));
router.use('/components_blueprints', require('./components_blueprints'));

module.exports = router;