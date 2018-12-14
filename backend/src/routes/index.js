var router = require('express').Router();

router.use('/api', require('./api'));

// Temporary for backwards compat

router.use('/cbcreds', require('./api/cbcreds'));

// End temporary

module.exports = router;