const express = require('express');

const router = express.Router();

const { userController } = require('../controllers');

router.post('/', userController.login);

module.exports = router;
