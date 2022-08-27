const express = require('express');

const router = express.Router();

const { categoryController } = require('../controllers');
const Middleware = require('../middleware');

router.use(Middleware.auth);
router.post('/', categoryController.create);
router.get('/', categoryController.getAll);

module.exports = router;
