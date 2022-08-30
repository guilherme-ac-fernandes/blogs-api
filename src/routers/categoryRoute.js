const express = require('express');

const { categoryController } = require('../controllers');
const Middleware = require('../middleware');

const router = express.Router();

router.use(Middleware.auth);
router.post('/', categoryController.create);
router.get('/', categoryController.getAll);

module.exports = router;
