const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listing');

router.get('/', listingController.index);
router.get('/:id', listingController.show);
router.post('/', listingController.create);
router.put('/:id', listingController.update);
router.delete('/:id', listingController.delete);

module.exports = router;
