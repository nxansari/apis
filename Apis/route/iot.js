const express = require('express');
const router = express.Router();
const controller = require('../controller/iot');

router.get('/read', controller.read);
router.post('/save', controller.save);

module.exports = router;