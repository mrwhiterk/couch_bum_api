const express = require('express');
const router = express.Router();

router.use('/listings', require('./listings'));
router.use('/skills', require('./skills'));
router.use('/bookings', require('./bookings'));

module.exports = router;
