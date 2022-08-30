const express = require('express');

const { userController } = require('../controllers');
const Middleware = require('../middleware');

const router = express.Router();

router.post('/', userController.create);

router.use(Middleware.auth);
router.get('/', userController.getAll);
router.get('/:id', userController.findById);
router.delete('/me', userController.delete);

module.exports = router;
