var router = require('express').Router();

router.use('/cbcreds', require('./cbcreds'));

module.exports = router;