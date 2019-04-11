const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking');

router.get('/', bookingController.index);
router.get('/:id', bookingController.show);
router.post('/', bookingController.create);
router.put('/:id', bookingController.update);
router.delete('/:id', bookingController.delete);

module.exports = router;
