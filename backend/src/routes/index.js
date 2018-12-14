var router = require('express').Router();

router.use('/api', require('./api'));

// Temporary for backwards compat

router.use('/cbcreds', require('./api/cbcreds'));
router.use('/cluster', require('./api/cluster'));
router.use('/services', require('./api/services'));
router.use('/services_distinct', require('./api/services_distinct'));
router.use('/components_blueprints', require('./api/components_blueprints'));
router.use('/filewriter', require('./api/filewriter'));

// End temporary

module.exports = router;