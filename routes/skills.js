const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill');

router.get('/', skillController.index);
router.get('/:id', skillController.show);
router.post('/', skillController.create);
router.put('/:id', skillController.update);
router.delete('/:id', skillController.delete);

module.exports = router;
